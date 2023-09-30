import classNames from 'classnames/bind';
import styles from './DetailVideo.module.scss';

const cx = classNames.bind(styles);

const DetailVideo = () => {
  return (
    <div className={cx('main-container')}>
      <div className={cx('video-detail-container')}>
        <div className={cx('content-container')}>
            <div className={cx('left-container')}>
                <div className={cx('player-container')}>
                    <div className={cx('video-container')}>
                        <div className={cx('blur-background-wrapper')}></div>
                        <div className={cx('video-wrapper')}></div>
                    </div>
                    <div className={cx('description-content-wrapper')}></div>
                </div>
                <div className={cx('comment-container')}></div>
            </div>
            <div className={cx('video-list-container')}></div>
        </div>
      </div>
    </div>
  );
};

export default DetailVideo;
