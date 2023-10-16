import { createContext, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useVideoModal } from '~/hooks';
import { updateInviewList } from '~/redux/videoSlice';

export const VideoContext = createContext();

const VideoContextProvider = ({ children }) => {
  const [isShowVideoModal, handleShowVideoModal, handleHideVideoModal] = useVideoModal();
  const [positionCurrentElement, setPositionCurrentElement] = useState(0);
  const [isScrollToTop, setIsScrollToTop] = useState(false);

  const wrapperRef = useRef(null);

  const indexInView = useSelector((state) => state.video.indexListInView);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    indexInView.forEach((video, index) => {
      const isCurrentElm = index === positionCurrentElement;
      isCurrentElm && dispatch(updateInviewList({ index, isInView: isCurrentElm }));
    });
    !isScrollToTop && handleScrollElement(positionCurrentElement);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionCurrentElement]);

  const handleScrollElement = (position) => {
    wrapperRef.current?.childNodes[position]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  const handleKeydown = (e) => {
    //pre
    const ARROW_UP = 38;
    const ARROW_DOWN = 40;
    if (e.keyCode === ARROW_UP) {
      e.preventDefault();
      setTimeout(() => {
        setPositionCurrentElement((prev) => {
          prev !== 0 && dispatch(updateInviewList({ index: prev, isInView: false }));
          return prev <= 0 ? 0 : prev - 1;
        });
      }, 300);
    }
    //next
    if (e.keyCode === ARROW_DOWN) {
      e.preventDefault();
      setTimeout(() => {
        setPositionCurrentElement((prev) => {
          dispatch(updateInviewList({ index: prev, isInView: false }));
          return prev + 1;
        });
      }, 300);
    }
  };

  const handleSetCurrentElement = useCallback((position) => {
    setPositionCurrentElement(position);
  }, []);

  return (
    <VideoContext.Provider
      value={{
        isShowVideoModal,
        handleShowVideoModal,
        handleHideVideoModal,
        handleKeydown,
        handleSetCurrentElement,
        wrapperRef,
        setIsScrollToTop,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContextProvider;
