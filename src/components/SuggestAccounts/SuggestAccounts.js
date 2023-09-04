import classNames from 'classnames/bind';
import styles from './SuggestAccounts.module.scss';
import AccountItem from './AccountItem';
// import { db } from '~/firebase';
// import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getSuggested } from '~/services/userService';
import AccountLoading from '../Loadings/AccountLoading';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SuggestAccounts({ seeAll, labelSuggested, sideBarRef }) {
  const [showLoadAll, setShowLoadAll] = useState(false);
  const [suggestAccounts, setSuggestAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await getSuggested();
      setSuggestAccounts(data);
      setIsLoading(false);
    })();
  }, []);

  const scrollTop = () => {
    sideBarRef.current.scrollTo({
      top: 130,
      behavior: 'smooth',
    });
  };

  // useEffect(() => {
  //   const suggestAccountCollectionRef = collection(db, 'suggestAccounts');
  //   getDocs(suggestAccountCollectionRef)
  //     .then((res) => {
  //       const sas = res.docs.map((doc) => ({
  //         data: doc.data(),
  //         id: doc.id,
  //       }));
  //       setSuggestAccounts(sas);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const handleSeeAll = () => {
    setShowLoadAll(!showLoadAll);
    if (showLoadAll) {
      scrollTop();
    }
  };

  const loadCount = showLoadAll ? suggestAccounts.length : 5;

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('label')}>{labelSuggested}</h2>
      {isLoading ? (
        <AccountLoading />
      ) : (
        suggestAccounts.slice(0, loadCount).map((account) => (
          <Link to={`/@${account.nickname}`} key={account.id}>
            <AccountItem data={account} label={labelSuggested} />
          </Link>
        ))
      )}
      {!isLoading && (
        <button className={cx('more-btn')}>
          <p className={cx('see')} onClick={handleSeeAll}>
            {showLoadAll ? 'See less' : seeAll}
          </p>
        </button>
      )}
    </div>
  );
}

export default SuggestAccounts;
