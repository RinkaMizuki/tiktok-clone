import classNames from 'classnames/bind';
import styles from './VideoPreview.module.scss';
import Image from '../../Images/Images';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIdUserListVideo, setIdVideoPlay, setNickNameUser } from '~/redux/videoSlice';
import TiktokLoading from '../../Loadings/TiktokLoading';
import { VideoContext } from '~/context/VideoContext';

const cx = classNames.bind(styles);

const VideoPreview = ({ video }) => {
  const videoID = useSelector((state) => state.video.videoId);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const { handleShowVideoModal: onShowVideoModal } = useContext(VideoContext);
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

  const handleClickVideoPreview = () => {
    dispatch(setIdUserListVideo(video.user.id));
    dispatch(setNickNameUser(video.user.nickname));
    onShowVideoModal();
  };
  const handleMouseVideo = () => {
    dispatch(setIdVideoPlay(video.id));
  };

  return (
    <div className={cx('video-item-container')} onClick={handleClickVideoPreview}>
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
