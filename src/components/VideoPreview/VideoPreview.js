import classNames from 'classnames/bind';
import styles from './VideoPreview.module.scss';
import Image from '../Images/Images';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIdVideoPlay } from '~/redux/videoSlice';
import TiktokLoading from '../Loadings/TiktokLoading';

const cx = classNames.bind(styles);

const VideoPreview = ({ video }) => {
  const videoID = useSelector((state) => state.video.id);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoID === video.id) {
      videoRef.current.play();
      videoRef.current.style.zIndex = '3';
    } else {
      videoRef.current.pause();
      videoRef.current.style.zIndex = '0';
      videoRef.current.currentTime = 0;
    }
  }, [videoID]);

  const handleWaitingVideo = () => {
    setIsLoadingVideo(true);
  };

  const handlePlayingVideo = () => {
    setIsLoadingVideo(false);
  };

  const handleMouseVideo = () => {
    dispatch(setIdVideoPlay(video.id));
  };

  return (
    <div className={cx('video-item-container')}>
      <Image src={video.thumb_url} atl={video.nickname} className={cx('thumb-video')} onMouseEnter={handleMouseVideo} />
      <video
        muted
        loop
        src={video.file_url}
        className={cx('video')}
        ref={videoRef}
        onWaiting={handleWaitingVideo}
        onPlaying={handlePlayingVideo}
      />
      {isLoadingVideo && (
        <div className={cx('position')}>
          <TiktokLoading medium={true} />
        </div>
      )}
    </div>
  );
};

export default VideoPreview;
