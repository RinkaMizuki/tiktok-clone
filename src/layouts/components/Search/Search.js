import { useState, useEffect, useRef } from 'react';
import TippyHeadLess from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import * as apiServices from '~/services/searchService';
import { Wrapper as WrapperPopper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { IconSearch } from '~/components/Icons';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const debounced = useDebounce(searchValue, 500);

  const inputElement = useRef();

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);
      const search = await apiServices.searchService(debounced);
      setSearchResult(search);
      setLoading(false);
    };
    fetchApi();

    //encodeURIComponent xử lí việc user nhập kí tự trùng với kí tự Query Parameter
  }, [debounced]);

  const handleClearInput = () => {
    setSearchValue('');
    setSearchResult([]);
    inputElement.current.focus();
  };
  const handleSetInput = (e) => {
    const searchValue = e.target.value;
    // const regex = /^\S/;
    // if (regex.test(searchValue)) {
    //   setSearchValue(searchValue);
    // } else {
    //   setSearchValue('');
    // }
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  const handleFocusInput = () => {
    setShowSearchResult(true);
  };

  const handleHideResult = () => {
    setShowSearchResult(false);
  };
  return (
    <div className={cx('search-wrapper')}>
      <TippyHeadLess
        onClickOutside={handleHideResult}
        interactive
        visible={showSearchResult && searchResult.length > 0}
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <WrapperPopper>
              <h4 className={cx('search-title')}>Accounts</h4>
              {searchResult.map((user) => (
                <AccountItem key={user.id} data={user} />
              ))}
            </WrapperPopper>
          </div>
        )}
      >
        <div className={cx('search')}>
          <input
            placeholder="Search accounts and videos"
            spellCheck={false}
            value={searchValue}
            onChange={(e) => {
              handleSetInput(e);
            }}
            onFocus={handleFocusInput}
            ref={inputElement}
          />
          {!!searchValue && !loading && (
            <button className={cx('clear')} onClick={handleClearInput}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
          <button className={cx('search-button')} onMouseDown={(e) => e.preventDefault()}>
            <IconSearch />
          </button>
        </div>
      </TippyHeadLess>
    </div>
  );
}

export default Search;
