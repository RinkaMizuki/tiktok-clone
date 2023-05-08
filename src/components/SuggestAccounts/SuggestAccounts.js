import classNames from 'classnames/bind';
import styles from './SuggestAccounts.module.scss';
import AccountItem from './AccountItem';
import { db } from '~/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function SuggestAccounts({ label, see }) {
  const [suggestAccounts, setSuggestAccounts] = useState([]);

  const [showLoadAll, setShowLoadAll] = useState(false);

  useEffect(() => {
    const suggestAccountCollectionRef = collection(db, 'suggestAccounts');
    getDocs(suggestAccountCollectionRef)
      .then((res) => {
        const sas = res.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setSuggestAccounts(sas);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClickShow = () => {
    setShowLoadAll(!showLoadAll);
  };

  const loadCount = showLoadAll ? suggestAccounts.length : 5;

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('label')}>{label}</h2>
      {suggestAccounts.slice(0, loadCount).map((account) => (
        <AccountItem data={account} key={account.id} label={label} />
      ))}
      <button className={cx('more-btn')} onClick={handleClickShow}>
        <p className={cx('see-all')}>{showLoadAll ? 'See less' : see}</p>
      </button>
    </div>
  );
}

export default SuggestAccounts;
