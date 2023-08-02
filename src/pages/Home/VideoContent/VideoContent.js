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
import { useElementOnScreen } from '~/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { adjustVolume, muteVolume } from '~/redux/videoSlice';
import TiktokLoading from '~/components/Loadings/TiktokLoading';
import { useLocalStorage } from '~/hooks';
import TippyShare from '~/components/Tippy/TippyShare';

const cx = classNames.bind(styles);

function VideoContent({ data }) {
  const [playing, setPlaying] = useState(false);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const videoRef = useRef();
  const adjustRef = useRef();
  const selectorRef = useRef();
  const timerRef = useRef();
  const timerTrackRef = useRef();
  const { setLocalStorage } = useLocalStorage();

  const dispatch = useDispatch();
  const muted = useSelector((state) => state.video.isMuted);
  const volume = useSelector((state) => state.video.defaultVolume);
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
        videoRef.current.currentTime = 0;
        setPlaying(false);
      }
    }
  }, [isVisible]);

  useLayoutEffect(() => {
    const {
      meta: { playtime_seconds },
    } = data;
    const totalTime = convertTime(playtime_seconds);
    timerRef.current.innerText = `00:00/${totalTime}`;
  }, []);

  // useEffect(() => {
  //   const currVolume = getLocalStorage('volume').value;
  //   if (!currVolume) {
  //     return;
  //   } else {
  //     adjustRef.current.value = currVolume;
  //     videoRef.current.volume = currVolume / 100;
  //     selectorRef.current.style.width = `${(currVolume / 100) * 46}px`;
  //   }
  // }, []);

  useLayoutEffect(() => {
    adjustRef.current.value = muted ? 0 : volume * 100;
    videoRef.current.volume = muted ? 0 : volume;
    selectorRef.current.style.width = `${muted ? 0 : volume * 46}px`;
  }, [muted, volume]);

  const handlePlayVideo = () => {
    if (!playing) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const handlePauseVideo = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const handleAdjustVolume = (value) => {
    const rangeVolume = value / 100;
    videoRef.current.volume = rangeVolume;
    selectorRef.current.style.width = `${rangeVolume * 45}px`;
    dispatch(muteVolume(!rangeVolume > 0));
    dispatch(adjustVolume(rangeVolume));
  };

  const handleSetFinalVolume = (value) => {
    dispatch(adjustVolume(value / 100));
    setLocalStorage('volume', { value });
  };

  const handleMutedVideo = () => {
    dispatch(adjustVolume(volume === 0 ? 0.5 : volume));
    dispatch(muteVolume(!muted));
  };
  const handleEndedVideo = (e) => {
    if (Math.floor(e.target.duration) === Math.floor(data.meta.playtime_seconds)) {
      videoRef.current.play();
    }
  };

  const handleShowMenu = () => {};

  var convertTime = function (input, separator) {
    var pad = function (input) {
      return input < 10 ? '0' + input : input;
    };
    return [pad(Math.floor((input % 3600) / 60)), pad(Math.floor(input % 60))].join(
      typeof separator !== 'undefined' ? separator : ':',
    );
  };

  const handleUpdateTimer = (e) => {
    const { currentTime, duration } = e.target;
    const currTime = convertTime(currentTime, ':');
    const totalTime = convertTime(duration, ':');

    timerTrackRef.current.style.width = `${(currentTime / duration) * 100}%`;
    timerRef.current.innerText = `${currTime}/${totalTime}`;
  };

  const handleWaitingVideo = () => {
    setIsLoadingVideo(true);
  };
  const handlePlayingVideo = () => {
    setIsLoadingVideo(false);
  };

  const {
    meta: {
      video: { resolution_x: videoWidth, resolution_y: videoHeight },
    },
  } = data;

  const directionVideoClass = videoWidth - videoHeight > 0 ? 'horizontal' : 'vertical';
  return (
    <div className={cx('wrapper')}>
      <div
        className={cx('video-container', {
          [directionVideoClass]: directionVideoClass,
        })}
      >
        {isVisible ? (
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
          onEnded={handleEndedVideo}
          onTimeUpdate={(e) => handleUpdateTimer(e)}
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
          <FontAwesomeIcon className={cx('custom-icon')} icon={faEllipsis} />
        </div>
        {!playing ? (
          <div
            onClick={handlePlayVideo}
            className={cx('play-icon', {
              animation: 'animation',
            })}
          >
            <FontAwesomeIcon className={cx('custom-icon')} icon={faPlay} />
          </div>
        ) : (
          <div
            onClick={handlePauseVideo}
            className={cx('pause-icon', {
              animation: 'animation',
            })}
          >
            <FontAwesomeIcon className={cx('custom-icon')} icon={faPause} />
          </div>
        )}
        <div
          className={cx('volume-icon', {
            animation: 'animation',
          })}
        >
          <div className={cx('volume-control')}>
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
              onClick={handleMutedVideo}
            />
          ) : (
            <FontAwesomeIcon
              style={{ padding: '10px' }}
              className={cx('custom-icon', {
                showing: muted,
              })}
              icon={faVolumeMute}
              onClick={handleMutedVideo}
            />
          )}
        </div>
        <div className={cx('time-duration-container')}>
          <div className={cx('time-duration')}>
            <div className={cx('time-duration-bar')}></div>
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
