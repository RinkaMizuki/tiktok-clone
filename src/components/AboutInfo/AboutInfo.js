import classNames from 'classnames/bind';
import styles from './AboutInfo.module.scss';

const cx = classNames.bind(styles);

function AboutInfo() {
  return (
    <div className={cx('wrapper')}>
      <ul className={cx('list')}>
        <li>About</li>
        <li>Newsroom</li>
        <li>Contact</li>
        <li>Careers</li>
        <li>ByteDance</li>
      </ul>
      <ul className={cx('list')}>
        <li>Tiktok for Good</li>
        <li>Advertise</li>
        <li>Developers</li>
        <li>Transparency</li>
        <li>Tiktok Rewards</li>
        <li>Tiktok Browse</li>
        <li>Tiktok Embeds</li>
      </ul>
      <ul className={cx('list')}>
        <li>Help</li>
        <li>Safety</li>
        <li>Terms</li>
        <li>Privacy</li>
        <li>Ceator Portal</li>
        <li>Community Guldelles</li>
      </ul>
      <span>© 2023 TikTok</span>
    </div>
  );
}

export default AboutInfo;
