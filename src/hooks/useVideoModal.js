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

  const handleHideVideoModal = (originPathname = null) => {
    document.body.style.overflowY = 'overlay';
    if (!originPathname) {
      setIsShowVideoModal(false);
      window.history.replaceState(null,'',pahtnameOrigin);
    }
    window.removeEventListener('popstate', handleDetectBackHistory);
  };

  return [isShowVideoModal, handleShowVideoModal, handleHideVideoModal];
};

export default useVideoModal;
