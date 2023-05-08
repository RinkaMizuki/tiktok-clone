import classNames from 'classnames/bind';
import image from '~/assets/images';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import AccountPreview from './AccountPreview';
import Image from '~/components/Images';
const cx = classNames.bind(styles);

function AccountItem({ data, label }) {
  return (
    <AccountPreview data={data} label={label}>
      <div className={cx('account-item')}>
        <Image className={cx('account-avatar')} src={data.data.avatar} alt="user" fallBack={image.ayakaImage} />
        <div className={cx('account-info')}>
          <span className={cx('nickname')}>{data.data.nickname}</span>
          {data.data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
          <p className={cx('name')}>{data.data.name}</p>
        </div>
      </div>
    </AccountPreview>
  );
}

export default AccountItem;
