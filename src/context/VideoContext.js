import { createContext, useState } from 'react';
import { useVideoModal } from '~/hooks';

export const VideoContext = createContext();

const VideoContextProvider = ({ children }) => {
  
  const [positionVideo, setPositionVideo] = useState(0);

  const [isShowVideoModal, handleShowVideoModal, handleHideVideoModal] = useVideoModal();

  return (
    <VideoContext.Provider value={{ isShowVideoModal, handleShowVideoModal, handleHideVideoModal }}>
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContextProvider;
