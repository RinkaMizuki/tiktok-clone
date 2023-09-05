import classNames from 'classnames/bind';
import styles from './HomeAccountLoading.module.scss';

const cx = classNames.bind(styles);

const HomeAccountLoading = () => {
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
        <div className={cx('description')}>
          <div className={cx('animation-loading')}></div>
        </div>
      </div>
    </div>
  );
};

export default HomeAccountLoading;
