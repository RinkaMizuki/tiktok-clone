import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import AccountPreview from './AccountPreview';
import Image from '~/components/Images';
const cx = classNames.bind(styles);

function AccountItem({ data, label, isFollowed }) {
  return (
    <AccountPreview data={data} label={label} isFollowed={isFollowed}>
      <div className={cx('account-item')}>
        <Image className={cx('account-avatar')} src={data.avatar} alt="user" />
        <div className={cx('account-inner')}>
          <div className={cx('account-info')}>
            <div className={cx('wrapper-check-name')}>
              <span className={cx('nickname')}>{data.nickname}</span>
              {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
            </div>
            <span className={cx('full-name')}>{`${data.first_name} ${data.last_name}`}</span>
          </div>
        </div>
      </div>
    </AccountPreview>
  );
}

export default AccountItem;
