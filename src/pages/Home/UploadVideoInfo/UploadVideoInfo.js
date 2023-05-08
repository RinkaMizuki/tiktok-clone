import classNames from 'classnames/bind';
import styles from './UploadVideoInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import Image from '~/components/Images';
const cx = classNames.bind(styles);

function UploadVideoInfo() {
  return (
    <div className={cx('content')}>
      <div className={cx('wrapper')}>
        <div>
          <Image
            className={cx('avatar')}
            src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/625a05296ec06c4ad0c4d8bf7ccdc7f7~c5_100x100.jpeg?x-expires=1681293600&x-signature=XhLCVHuup04YmGxoLJimAuWr5FE%3D"
            alt="Rinka Mizuki"
          />
        </div>
        <div className={cx('desc')}>
          <div className={cx('info-user')}>
            <h3 className={cx('nickname')}>stella</h3>
            <span className={cx('name')}>Stella Vermillion</span>
          </div>
          <div className={cx('hashtag')}>
            <p>I am a Wibi</p>
            <strong>
              <a href="#">#anime</a>
            </strong>
            <strong>
              <a href="#">#j4f</a>
            </strong>
          </div>
          <div className={cx('music')}>
            <FontAwesomeIcon className={cx('icon-music')} icon={faMusic} />
            <a href="#">nhạc nền - Yomein was a popular idol</a>
          </div>
        </div>
        <div className={cx('btn-follow')}>
          <Button outline small>
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UploadVideoInfo;
