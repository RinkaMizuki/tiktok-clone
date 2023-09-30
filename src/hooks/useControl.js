import { useLayoutEffect, useRef, useState } from 'react';
import useLocalStorage from './useLocalStorage';
import { adjustVolume, muteVolume } from '~/redux/videoSlice';
import { useDispatch, useSelector } from 'react-redux';

const useControl = (playtime_seconds) => {
  //react-hooks
  const [renderEvent, setRenderEvent] = useState(true);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const { setLocalStorage, getLocalStorage } = useLocalStorage();
  const [timer, setTimer] = useState(0);
  //refs
  const selectorRef = useRef(null);
  const volumeControlRef = useRef(null);
  const adjustRef = useRef(null);
  const playRef = useRef(null);
  const pauseRef = useRef(null);
  const videoRef = useRef(null);
  const menuRef = useRef(null);
  const volumeBarRef = useRef(null);
  const volumeHighRef = useRef(null);
  const volumeMutedRef = useRef(null);
  const timerRef = useRef(null);
  const timerTrackRef = useRef(null);
  const timerCircleRef = useRef(null);

  //action redux
  const dispatch = useDispatch();
  const muted = useSelector((state) => state.video.isMuted);
  const volume = useSelector((state) => state.video.defaultVolume);

  useLayoutEffect(() => {
    const totalTime = convertTime(playtime_seconds);
    if (timerRef.current) {
      timerRef.current.innerText = `00:00/${totalTime}`;
    }
  }, []);

  useLayoutEffect(() => {
    let currentVolume = volume * 100;
    const widthVolumeBar = volumeBarRef.current.clientWidth;
    if (getLocalStorage('volume').hasOwnProperty('value')) {
      currentVolume = getLocalStorage('volume').value;
    }
    adjustRef.current.value = muted ? 0 : +currentVolume || volume * 100;
    videoRef.current.volume = muted ? 0 : +currentVolume / 100 || volume;
    selectorRef.current.style.width = `${
      muted ? 0 : (+currentVolume / 100) * widthVolumeBar || volume * widthVolumeBar
    }px`;
  }, [muted, volume]);

  const handleAdjustVolume = (value) => {
    const rangeVolume = value / 100;
    const widthVolumeBar = volumeBarRef.current.clientWidth;
    videoRef.current.volume = rangeVolume;
    selectorRef.current.style.width = `${rangeVolume * widthVolumeBar}px`;
    dispatch(muteVolume(!rangeVolume > 0));
    dispatch(adjustVolume(rangeVolume));
    if (pauseRef.current) {
      pauseRef.current.style.opacity = '0';
    } else if (playRef.current) {
      playRef.current.style.opacity = '0';
    }
    if (menuRef.current) {
      menuRef.current.style.opacity = '0';
    }
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
    if (menuRef.current) {
      menuRef.current.style.opacity = '1';
    }
    if (volumeControlRef.current) {
      volumeControlRef.current.style.opacity = '1';
    }
    if (volumeHighRef.current) {
      volumeHighRef.current.style.opacity = '1';
    } else if (volumeMutedRef.current) {
      volumeMutedRef.current.style.opacity = '1';
    }
    setRenderEvent(false);
  };

  const handleSetFinalVolume = (value) => {
    dispatch(adjustVolume(value / 100));
  };

  const handleMouseInto = () => {
    volumeControlRef.current.style.opacity = '1';
  };
  const handleMouseOut = () => {
    volumeControlRef.current.style.opacity = '0';
  };

  function handleControlVideo(currentTime, duration, currTime, totalTime) {
    if (timerTrackRef.current) {
      timerTrackRef.current.style.width = `${Math.ceil((currentTime / duration) * 100) - 0.3}%`;
    }

    if (timerCircleRef.current) {
      timerCircleRef.current.value = Math.ceil((currentTime * 100) / duration);
    }
    if (timerRef.current) {
      timerRef.current.innerText = `${currTime}/${totalTime}`;
    }
    setTimer(Math.ceil((currentTime * 100) / duration));
  }

  const handleChangeTime = (e) => {
    videoRef.current.pause();
    const currentTimeVideo = (e.target.value * videoRef.current.duration) / 100;
    timerTrackRef.current.style.width = `${Math.ceil((currentTimeVideo * 100) / videoRef.current.duration) - 0.3}%`;
    videoRef.current.currentTime = currentTimeVideo;
    setTimer(e.target.value);
  };

  const handleUpdateTimer = (e) => {
    const { currentTime, duration } = e.target;
    const currTime = convertTime(currentTime, ':');
    const totalTime = convertTime(isNaN(duration) ? playtime_seconds : duration, ':');
    handleControlVideo(currentTime, duration, currTime, totalTime);
  };

  const handleWaitingVideo = () => {
    setIsLoadingVideo(true);
  };
  const handlePlayingVideo = () => {
    setIsLoadingVideo(false);
  };

  const convertTime = function (input, separator) {
    const pad = function (input) {
      return input < 10 ? '0' + input : input;
    };
    return [pad(Math.floor((input % 3600) / 60)), pad(Math.floor(input % 60))].join(
      typeof separator !== 'undefined' ? separator : ':',
    );
  };

  return {
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
    handleControlVideo,
    renderEvent,
    playRef,
    pauseRef,
    videoRef,
    volumeControlRef,
    selectorRef,
    adjustRef,
    menuRef,
    volumeHighRef,
    volumeMutedRef,
    volumeBarRef,
    timerRef,
    timerTrackRef,
    timerCircleRef,
    timer,
    isLoadingVideo,
  };
};

export default useControl;
