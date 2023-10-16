import { useState } from 'react';

const useVideoModal = () => {
  const [isShowVideoModal, setIsShowVideoModal] = useState(false);
  const [pahtnameOrigin, setUrlOrigin] = useState('/');

  const handleDetectBackHistory = () => {
    setIsShowVideoModal(false);
  };

  const handleShowVideoModal = () => {
    window.addEventListener('popstate', handleDetectBackHistory, false);
    document.body.style.overflowY = 'hidden';
    setIsShowVideoModal(true);
    setUrlOrigin(window.location.pathname);
  };

  const handleHideVideoModal = (pathname = null) => {
    document.body.style.overflowY = 'overlay';
    if (!pathname) {
      setIsShowVideoModal(false);
      window.history.replaceState(null, '', pahtnameOrigin);
    } else if (pahtnameOrigin === `/@${pathname}`) {
      window.history.pushState(null, '', `/@${pathname}`);
      setIsShowVideoModal(false);
    } else {
      setIsShowVideoModal(false);
    }
    window.removeEventListener('popstate', handleDetectBackHistory);
  };

  return [isShowVideoModal, handleShowVideoModal, handleHideVideoModal];
};

export default useVideoModal;
