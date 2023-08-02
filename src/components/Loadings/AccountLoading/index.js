import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './AccountLoading.module.scss';

const cx = classNames.bind(styles);

function AccountLoading({
  smallHeight = '12px',
  largeWidth = '107px',
  smallWidth = '66px',
  avatarWidth = '32px',
  avatarHeight = '32px',
}) {
  return (
    <div id={cx('loader')} className={cx('loader')}>
      <div className={cx('DivBaseComponent-StyledAvatar')} style={{ height: avatarHeight, width: avatarWidth }}></div>
      <div className={cx('DivSkeletonTitleGroup')}>
        <div className={cx('DivBaseComponent-StyledTitle')} style={{ height: smallHeight, width: largeWidth }}></div>
        <div className={cx('DivBaseComponent-StyledTitle')} style={{ height: smallHeight, width: smallWidth }}></div>
      </div>
    </div>
  );
}

AccountLoading.propTypes = {
  medium: PropTypes.bool,
  small: PropTypes.bool,
};

export default AccountLoading;
