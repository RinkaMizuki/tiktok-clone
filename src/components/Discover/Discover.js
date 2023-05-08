import classNames from 'classnames/bind';
import styles from './Discover.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag, faMusic } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Discover() {
  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('label')}>Discover</h2>
      <div>
        <ul className={cx('list')}>
          <a href="#">
            <li className={cx('item')}>
              <FontAwesomeIcon className={cx('icon')} icon={faHashtag} />
              <p>suthatla</p>
            </li>
          </a>
          <a href="#">
            <li className={cx('item')}>
              <FontAwesomeIcon className={cx('icon')} icon={faHashtag} />
              <p>mackedoi</p>
            </li>
          </a>
          <a href="#">
            <li className={cx('item')}>
              <FontAwesomeIcon className={cx('icon')} icon={faHashtag} />
              <p>sansangthaydoi</p>
            </li>
          </a>
          <a href="#">
            <li className={cx('item')}>
              <FontAwesomeIcon className={cx('icon')} icon={faMusic} />
              <p>Yêu Đơn Phương Là Gì (MEE Remix) - Mee Media & h0n & BHMedia</p>
            </li>
          </a>
          <a href="#">
            <li className={cx('item')}>
              <FontAwesomeIcon className={cx('icon')} icon={faMusic} />
              <p>Về Nghe Mẹ Ru - NSND Bach Tuyet & Hứa Kim Tuyền & 14 Casper & Hoàng Dũng</p>
            </li>
          </a>
          <a href="#">
            <li className={cx('item')}>
              <FontAwesomeIcon className={cx('icon')} icon={faMusic} />
              <p>Thiên Thần Tình Yêu - RICKY STAR ạnd T.R.I</p>
            </li>
          </a>
          <a href="#">
            <li className={cx('item')}>
              <FontAwesomeIcon className={cx('icon')} icon={faHashtag} />
              <p>7749hieuung</p>
            </li>
          </a>
          <a href="#">
            <li className={cx('item')}>
              <FontAwesomeIcon className={cx('icon')} icon={faHashtag} />
              <p>genzlife</p>
            </li>
          </a>
          <a href="#">
            <li className={cx('item')}>
              <FontAwesomeIcon className={cx('icon')} icon={faMusic} />
              <p>Tình Đã Đầy Một Tim - Huyền Tâm Môn</p>
            </li>
          </a>
          <a href="#">
            <li className={cx('item')}>
              <FontAwesomeIcon className={cx('icon')} icon={faMusic} />
              <p>Thằng Hầu (Thái Hoàng Remix) [Short Version] - Dunghoangpham</p>
            </li>
          </a>
        </ul>
      </div>
    </div>
  );
}

export default Discover;
