import classNames from 'classnames/bind';
import styles from './VideoContent.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { VideoContext } from '~/context/VideoContext';
import {
  faComment,
  faHeart,
  faShare,
  faEllipsis,
  faVolumeHigh,
  faVolumeMute,
  faPlay,
  faPause,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useClickAway } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';
import { setInfoCurrentVideo, updateInviewList } from '~/redux/videoSlice';
import { useControl } from '~/hooks';
import TiktokLoading from '~/components/Loadings/TiktokLoading';
import TippyShare from '~/components/Tippy/TippyShare';

const cx = classNames.bind(styles);

function VideoContent({ data, index, indexInView, priorVideo }) {
  const [playing, setPlaying] = useState(false);
  const [userInteract, setUserInteract] = useState(false);

  const {
    meta: {
      playtime_seconds,
      video: { resolution_x: videoWidth, resolution_y: videoHeight },
    },
    user: { id: userId, nickname: nicknameUser },
    id: videoId,
  } = data;

  const frameRate = videoWidth - videoHeight > 0;
  const directionVideoClass = frameRate ? 'horizontal' : 'vertical';
  const [inViewRef, isInView] = useInView({ root: null, threshold: 0.57 });

  //context
  const { isShowVideoModal, handleShowVideoModal: onShowModal,handleSetCurrentElement } = useContext(VideoContext);

  //refs
  const videoContainerRef = useRef(null);

  //custom hooks
  const {
    handleAdjustVolume,
    handleMutedVideo,
    handleSetFinalVolume,
    handleMouseInto,
    handleMouseOut,
    setRenderEvent,
    handleUpdateTimer,
    handleChangeTime,
    handleWaitingVideo,
    handlePlayingVideo,
    renderEvent,
    playRef,
    pauseRef,
    videoRef,
    volumeControlRef,
    adjustRef,
    selectorRef,
    menuRef,
    volumeHighRef,
    volumeMutedRef,
    volumeBarRef,
    timerRef,
    timerTrackRef,
    timerCircleRef,
    timer,
    isLoadingVideo,
  } = useControl(playtime_seconds);

  // //action redux
  const dispatch = useDispatch();
  const muted = useSelector((state) => state.video.isMuted);

  useLayoutEffect(() => {
    handleUpdateInview(index, isInView);
    if(isInView) {
      handleSetCurrentElement(index);
      dispatch(setInfoCurrentVideo({
        videoId,
        userId,
        nicknameUser,
        indexVideo: index,
      }));
    }
  }, [isInView]);

  useEffect(() => {
    if (indexInView) {
      if (isShowVideoModal) {
        setPlaying(false);
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        timerTrackRef.current.style.width = '0px';
      } else {
        setPlaying(true);
        videoRef.current.play();
      }
    } else {
      setPlaying(false);
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      timerTrackRef.current.style.width = '0px';
    }
  }, [indexInView, isShowVideoModal]);

  useEffect(() => {
    const currentScrollPos = window.scrollY;

    const handleInteractive = () => {
      const newScrollPos = window.scrollY;
      setUserInteract(false);
      if (newScrollPos > currentScrollPos) {
        //scroll down
        if (isInView) {
          // console.log(index);
        } else {
          handleUpdateInview(priorVideo, true);
          handleUpdateInview(index, false);
        }
        console.log('scroll down');
      } else {
        //scroll up
        if (isInView) {
          // console.log(index);
        } else {
          handleUpdateInview(priorVideo, true);
          handleUpdateInview(index, false);
        }
      }
    };

    if (userInteract) {
      document.addEventListener('scroll', handleInteractive);
      return () => {
        document.removeEventListener('scroll', handleInteractive);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInteract]);

  useClickAway(videoContainerRef, () => {
    //when click outside of video
    if (pauseRef.current) {
      pauseRef.current.style.opacity = '0';
    } else if (playRef.current) {
      playRef.current.style.opacity = '0';
    }
    menuRef.current.style.opacity = '0';
    volumeControlRef.current.style.opacity = '0';
    if (volumeHighRef.current) {
      volumeHighRef.current.style.opacity = '0';
    } else if (volumeMutedRef.current) {
      volumeMutedRef.current.style.opacity = '0';
    }
    setRenderEvent(true);
  });

  const handleUpdateInview = (index, isInView) => {
    dispatch(updateInviewList({ index: index, isInView: isInView }));
  };

  const handlePlayVideo = () => {
    if (!playing) {
      videoRef.current.play();
      playRef.current.style.opacity = '1';
      menuRef.current.style.opacity = '1';
      if (volumeHighRef.current) {
        volumeHighRef.current.style.opacity = '1';
      } else if (volumeMutedRef.current) {
        volumeMutedRef.current.style.opacity = '1';
      }
      volumeControlRef.current.style.opacity = '0';
      setPlaying(true);
      if (!indexInView) {
        handleUpdateInview(priorVideo, false);
        handleUpdateInview(index, true);
        setUserInteract(true);
      }
    }
    setRenderEvent(true);
  };

  const handlePauseVideo = () => {
    if (playing) {
      videoRef.current.pause();
      pauseRef.current.style.opacity = '1';
      menuRef.current.style.opacity = '1';
      if (volumeHighRef.current) {
        volumeHighRef.current.style.opacity = '1';
      } else if (volumeMutedRef.current) {
        volumeMutedRef.current.style.opacity = '1';
      }
      volumeControlRef.current.style.opacity = '0';
      setPlaying(false);
      setRenderEvent(true);
    }
  };

  const handleShowMenu = () => {
    volumeControlRef.current.style.opacity = '0';
    setRenderEvent(true);
  };

  const handleShowVideoModal = () => {
    dispatch(
      setInfoCurrentVideo({
        videoId,
        userId,
        nicknameUser,
        indexVideo: index,
      }),
    );
    onShowModal();
  };

  return (
    <div className={cx('wrapper')} ref={inViewRef}>
      <div
        ref={videoContainerRef}
        className={cx('video-container', {
          [directionVideoClass]: directionVideoClass,
        })}
      >
        {indexInView ? (
          <img
            alt="thumb-video"
            src={data.thumb_url}
            className={cx('thumb-video', {
              active: 'active',
            })}
          ></img>
        ) : (
          <img src={data.thumb_url} className={cx('thumb-video')} alt="thumb-video"></img>
        )}
        <video
          ref={videoRef}
          src={data.file_url}
          className={cx('video')}
          loop
          onTimeUpdate={handleUpdateTimer}
          onWaiting={handleWaitingVideo}
          onPlaying={handlePlayingVideo}
          onClick={handleShowVideoModal}
        ></video>
        {isLoadingVideo && (
          <div className={cx('position')}>
            <TiktokLoading medium={true} />
          </div>
        )}
        <div
          onClick={handleShowMenu}
          className={cx('menu-icon', {
            animation: 'animation',
          })}
        >
          <FontAwesomeIcon ref={menuRef} className={cx('custom-icon')} icon={faEllipsis} />
        </div>
        {!playing ? (
          <div
            onClick={handlePlayVideo}
            className={cx('play-icon', {
              animation: 'animation',
            })}
          >
            <FontAwesomeIcon ref={playRef} className={cx('custom-icon')} icon={faPlay} />
          </div>
        ) : (
          <div
            onClick={handlePauseVideo}
            className={cx('pause-icon', {
              animation: 'animation',
            })}
          >
            <FontAwesomeIcon ref={pauseRef} className={cx('custom-icon')} icon={faPause} />
          </div>
        )}
        <div
          className={cx('volume-icon', {
            animation: 'animation',
          })}
        >
          <div
            onMouseEnter={renderEvent ? handleMouseInto : () => {}}
            onMouseLeave={renderEvent ? handleMouseOut : () => {}}
          >
            <div ref={volumeControlRef} className={cx('volume-control')}>
              <div className={cx('volume-bar')} ref={volumeBarRef}>
                <input
                  className={cx('input')}
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  onChange={(e) => handleAdjustVolume(e.target.value)}
                  onMouseUp={(e) => handleSetFinalVolume(e.target.value)}
                  ref={adjustRef}
                />
                <div className={cx('selector')} ref={selectorRef}></div>
              </div>
            </div>
            {!muted ? (
              <FontAwesomeIcon
                style={{ padding: '10px' }}
                className={cx('custom-icon')}
                icon={faVolumeHigh}
                ref={volumeHighRef}
                onClick={handleMutedVideo}
              />
            ) : (
              <FontAwesomeIcon
                style={{ padding: '10px' }}
                className={cx('custom-icon', {
                  showing: muted,
                })}
                icon={faVolumeMute}
                ref={volumeMutedRef}
                onClick={handleMutedVideo}
              />
            )}
          </div>
        </div>
        <div className={cx('time-duration-container')}>
          <div className={cx('time-duration')}>
            <div className={cx('timer-control')}></div>
            <input
              ref={timerCircleRef}
              className={cx('input')}
              type="range"
              min="0"
              max="100"
              step="1"
              value={isNaN(timer) ? 0 : timer}
              onInput={handleChangeTime}
              onMouseUp={() => videoRef.current.play()}
            />
            <div className={cx('time-duration-track')} ref={timerTrackRef}></div>
          </div>
          <div className={cx('display-timer')} ref={timerRef}></div>
        </div>
      </div>

      <div className={cx('interactive')}>
        <button className={cx('btn-like')}>
          <span className={cx('icon-heart')}>
            <FontAwesomeIcon icon={faHeart} />
          </span>
          <strong className={cx('view')}>
            <span>{data.likes_count}</span>
          </strong>
        </button>

        <button className={cx('btn-cmt')} onClick={handleShowVideoModal}>
          <span className={cx('icon-heart')}>
            <FontAwesomeIcon icon={faComment} />
          </span>
          <strong className={cx('view')}>
            <span>{data.comments_count}</span>
          </strong>
        </button>

        <div>
          <TippyShare delay={[0, 500]} interactive={true} zIndex="998" placement="top">
            <button className={cx('btn-share')}>
              <span className={cx('icon-heart')}>
                <FontAwesomeIcon icon={faShare} />
              </span>
              <strong className={cx('view')}>
                <span>{data.shares_count}</span>
              </strong>
            </button>
          </TippyShare>
        </div>
      </div>
    </div>
  );
}

export default VideoContent;
