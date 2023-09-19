import classNames from 'classnames/bind';
import styles from './VideoContent.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { adjustVolume, muteVolume, updateInviewList } from '~/redux/videoSlice';
import TiktokLoading from '~/components/Loadings/TiktokLoading';
import { useLocalStorage } from '~/hooks';
import TippyShare from '~/components/Tippy/TippyShare';

const cx = classNames.bind(styles);

function VideoContent({ data, index, indexInView, priorVideo, currentElement }) {
  const [playing, setPlaying] = useState(false);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [renderEvent, setRenderEvent] = useState(true);
  const [userInteract, setUserInteract] = useState(false);
  const [timer, setTimer] = useState(0);

  const {
    meta: {
      video: { resolution_x: videoWidth, resolution_y: videoHeight },
    },
  } = data;

  const frameRate = videoWidth - videoHeight > 0;
  const directionVideoClass = frameRate ? 'horizontal' : 'vertical';
  const [inViewRef, isInView] = useInView({ root: null, threshold: 0.57 });

  const videoRef = useRef(null);
  const adjustRef = useRef(null);
  const selectorRef = useRef(null);
  const timerRef = useRef(null);
  const timerTrackRef = useRef(null);
  const timerCircleRef = useRef(null);
  const playRef = useRef(null);
  const pauseRef = useRef(null);
  const menuRef = useRef(null);
  const volumeControlRef = useRef(null);
  const volumeHighRef = useRef(null);
  const volumeMutedRef = useRef(null);
  const videoContainerRef = useRef(null);
  const volumeContainer = useRef(null);

  const { setLocalStorage } = useLocalStorage();

  const dispatch = useDispatch();
  const muted = useSelector((state) => state.video.isMuted);
  const volume = useSelector((state) => state.video.defaultVolume);

  useLayoutEffect(() => {
    handleUpdateInview(index, isInView);
    isInView && currentElement(index);
  }, [isInView]);

  useEffect(() => {
    if (indexInView) {
      setPlaying(true);
      videoRef.current.play();
    } else {
      setPlaying(false);
      videoRef.current.load();
      handleControlVideo(0, 1, 0, 1);
    }
  }, [indexInView]);

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

  useLayoutEffect(() => {
    const {
      meta: { playtime_seconds },
    } = data;
    const totalTime = convertTime(playtime_seconds);
    timerRef.current.innerText = `00:00/${totalTime}`;
  }, []);

  useLayoutEffect(() => {
    adjustRef.current.value = muted ? 0 : volume * 100;
    videoRef.current.volume = muted ? 0 : volume;
    selectorRef.current.style.width = `${muted ? 0 : volume * 46}px`;
  }, [muted, volume]);

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

  const handleAdjustVolume = (value) => {
    const rangeVolume = value / 100;
    videoRef.current.volume = rangeVolume;
    selectorRef.current.style.width = `${rangeVolume * 45}px`;
    dispatch(muteVolume(!rangeVolume > 0));
    dispatch(adjustVolume(rangeVolume));
    if (pauseRef.current) {
      pauseRef.current.style.opacity = '0';
    } else if (playRef.current) {
      playRef.current.style.opacity = '0';
    }
    menuRef.current.style.opacity = '0';
  };

  const handleSetFinalVolume = (value) => {
    dispatch(adjustVolume(value / 100));
    setLocalStorage('volume', { value });
  };

  const handleMutedVideo = () => {
    dispatch(adjustVolume(volume === 0 ? 0.5 : volume));
    dispatch(muteVolume(!muted));
    if (pauseRef.current) {
      pauseRef.current.style.opacity = '1';
    } else if (playRef.current) {
      playRef.current.style.opacity = '1';
    }
    menuRef.current.style.opacity = '1';
    volumeControlRef.current.style.opacity = '1';
    if (volumeHighRef.current) {
      volumeHighRef.current.style.opacity = '1';
    } else if (volumeMutedRef.current) {
      volumeMutedRef.current.style.opacity = '1';
    }
    setRenderEvent(false);
  };

  const handleShowMenu = () => {
    volumeControlRef.current.style.opacity = '0';
    setRenderEvent(true);
  };

  const convertTime = function (input, separator) {
    const pad = function (input) {
      return input < 10 ? '0' + input : input;
    };
    return [pad(Math.floor((input % 3600) / 60)), pad(Math.floor(input % 60))].join(
      typeof separator !== 'undefined' ? separator : ':',
    );
  };

  function handleControlVideo(currentTime, duration, currTime, totalTime) {
    timerTrackRef.current.style.width = `${Math.ceil((currentTime / duration) * 100)}%`;
    timerCircleRef.current.value = Math.ceil((currentTime * 100) / duration);
    timerRef.current.innerText = `${currTime}/${totalTime}`;
    setTimer(Math.ceil((currentTime * 100) / duration));
  }

  const handleUpdateTimer = (e) => {
    const { currentTime, duration } = e.target;
    const currTime = convertTime(currentTime, ':');
    const totalTime = convertTime(isNaN(duration) ? data.meta.playtime_seconds : duration, ':');
    handleControlVideo(currentTime, duration, currTime, totalTime);
  };

  const handleWaitingVideo = () => {
    setIsLoadingVideo(true);
  };
  const handlePlayingVideo = () => {
    setIsLoadingVideo(false);
  };

  const handleMouseInto = () => {
    volumeControlRef.current.style.opacity = '1';
  };
  const handleMouseOut = () => {
    volumeControlRef.current.style.opacity = '0';
  };
  const handleChangeTime = (e) => {
    videoRef.current.pause();
    const currentTimeVideo = (e.target.value * videoRef.current.duration) / 100;
    timerTrackRef.current.style.width = `${Math.ceil((currentTimeVideo * 100) / videoRef.current.duration)}%`;
    videoRef.current.currentTime = currentTimeVideo;
    setTimer(e.target.value);
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
          preload="none"
          // onEnded={handleEndedVideo}
          loop
          onTimeUpdate={handleUpdateTimer}
          onWaiting={handleWaitingVideo}
          onPlaying={handlePlayingVideo}
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
            ref={volumeContainer}
            onMouseEnter={renderEvent ? handleMouseInto : () => {}}
            onMouseLeave={renderEvent ? handleMouseOut : () => {}}
          >
            <div ref={volumeControlRef} className={cx('volume-control')}>
              <div className={cx('volume-bar')}>
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

        <button className={cx('btn-cmt')}>
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
