import classNames from 'classnames/bind';
import styles from './ProfileLoading.module.scss';

const cx = classNames.bind(styles);

const ProfileLoading = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('avatar')}>
        <div className={cx('animation-loading')}></div>
      </div>
      <div className={cx('body')}>
        <div className={cx('user-name')}>
          <div className={cx('animation-loading')}></div>
        </div>
        <div className={cx('full-name')}>
          <div className={cx('animation-loading')}></div>
        </div>
        <div className={cx('description')}>
          <div className={cx('animation-loading')}></div>
        </div>
      </div>
      <div className={cx('info')}>
        <div className={cx('animation-loading')}></div>
      </div>
    </div>
  );
};

export default ProfileLoading;
