import classNames from 'classnames/bind';
import styles from './UploadVideo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useElementOnScreen } from '~/hooks';

const cx = classNames.bind(styles);

function UploadVideo({ data }) {
  const videoRef = useRef();

  const [playing, setPlaying] = useState(false);
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  };
  const isVisible = useElementOnScreen(options, videoRef);
  useEffect(() => {
    if (isVisible) {
      if (!playing) {
        videoRef.current.play();
        setPlaying(true);
      }
    } else {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
  }, [isVisible]);

  return (
    <>
      <div className={cx('wrapper')}>
        <video ref={videoRef} src={data} className={cx('video')} controls loop></video>

        <div className={cx('interactive')}>
          <button className={cx('btn-like')}>
            <span className={cx('icon-heart')}>
              <FontAwesomeIcon icon={faHeart} />
            </span>
            <strong className={cx('view')}>
              <span>23521</span>
            </strong>
          </button>

          <button className={cx('btn-like')}>
            <span className={cx('icon-heart')}>
              <FontAwesomeIcon icon={faComment} />
            </span>
            <strong className={cx('view')}>
              <span>12441</span>
            </strong>
          </button>

          <button className={cx('btn-like')}>
            <span className={cx('icon-heart')}>
              <FontAwesomeIcon icon={faShare} />
            </span>
            <strong className={cx('view')}>
              <span>4563</span>
            </strong>
          </button>
        </div>
      </div>
    </>
  );
}

export default UploadVideo;
