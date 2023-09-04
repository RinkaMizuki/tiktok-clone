import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './FollowAccounts.module.scss';
import { getFollowed } from '~/services/userService';
import AccountItem from '../SuggestAccounts/AccountItem/AccountItem';
import AccountLoading from '../Loadings/AccountLoading';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
let totalPages;

const FollowAccounts = ({ labelFollowed, seeMore, sideBarRef }) => {
  const [followAccounts, setFollowAccounts] = useState([]);
  const [page, setPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [isShowItem, setIsShowItem] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isLogin = useSelector((state) => state.auth.login.isLogin);

  const scrollTop = () => {
    sideBarRef?.current.scrollTo({ top: 200, behavior: 'smooth' });
  };
  useEffect(() => {
    if (isLogin) {
      (async () => {
        setIsLoading(true);
        const { data, meta } = await getFollowed(page);
        if (meta.pagination.current_page > totalPages) {
          setIsShowItem(false);
          setShowLoadMore(true);
        }
        totalPages = meta.pagination.total_pages;
        let listUsers;
        if (followAccounts.length > 0) {
          listUsers = data.filter(function (cv) {
            return !followAccounts.find(function (e) {
              return e.id === cv.id;
            });
          });
        } else {
          listUsers = data;
        }
        setFollowAccounts([...followAccounts, ...listUsers]);
        setIsLoading(false);
      })();
    }
  }, [page]);

  const handleSeeMore = () => {
    if (page <= totalPages) {
      setPage((prevPage) => prevPage + 1);
    } else if (page > totalPages) {
      setIsShowItem(false);
      setShowLoadMore(true);
    } else {
      return;
    }
  };

  const handleSeeLess = () => {
    setIsShowItem(true);
    setShowLoadMore(false);
    scrollTop();
  };

  const loadCount = isShowItem ? 5 : followAccounts.length;

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('label')}>{labelFollowed}</h2>
      {isLoading && followAccounts.length > 0 ? (
        <>
          <>
            {followAccounts.slice(0, loadCount).map((account) => (
              <Link to={`/@${account.nickname}`} key={account.id}>
                <AccountItem data={account} label={labelFollowed} isFollowed={account.is_followed} />
              </Link>
            ))}
          </>

          <AccountLoading />
        </>
      ) : (
        <>
          {isLoading ? (
            <AccountLoading />
          ) : (
            followAccounts.slice(0, loadCount).map((account) => (
              <Link to={`/@${account.nickname}`} key={account.id}>
                <AccountItem data={account} label={labelFollowed} isFollowed={account.is_followed} />
              </Link>
            ))
          )}
        </>
      )}

      {!isLoading && followAccounts.length === 0 ? (
        <p className={cx('none-following')}>Accounts you follow will appear here</p>
      ) : (
        <button className={cx('more-btn')}>
          {showLoadMore ? (
            <p className={cx('see')} onClick={handleSeeLess}>
              {!isLoading && 'See less'}
            </p>
          ) : (
            <p className={cx('see')} onClick={handleSeeMore}>
              {!isLoading && seeMore}
            </p>
          )}
        </button>
      )}
    </div>
  );
};

export default FollowAccounts;
