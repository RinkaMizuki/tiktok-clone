import VideoInfo from './VideoInfo';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '~/firebase';
// import UploadVideoInfo from './UploadVideoInfo';
// import UploadVideo from './UploadVideo/UploadVideo';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { videoService } from '~/services/videoService';
import { InView } from 'react-intersection-observer';
import TiktokLoading from '~/components/Loadings/TiktokLoading';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/redux/authSlice';
import HomeAccountLoading from '~/components/Loadings/HomeAccountLoading';
import { useEffect } from 'react';
import { updateInviewList } from '~/redux/videoSlice';
const cx = classNames.bind(styles);

function Home() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(10);
  const [priority, setPriority] = useState(0);
  const [positionCurrentElement, setPositionCurrentElement] = useState(0);

  const isLogin = useSelector((state) => state.auth.login.isLogin);
  const indexInView = useSelector((state) => state.video.index);
  const dispatch = useDispatch();
  const TTL_COOKIES = document.cookie.split('=')[1];
  !TTL_COOKIES && isLogin && dispatch(logout());
  const maxLength = videos.length - 1;
  //ref
  const pageRandom = useRef([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const priorVideo = indexInView.findIndex((item) => item.isInView);
    setPriority(priorVideo);
  }, [indexInView]);

  const handleGetPageRandom = (callback) => {
    if (callback < 1) return;
    function getListVideo() {
      return new Promise((resolve, reject) => {
        videoService(callback)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    }
    getListVideo().then((listVideo) => {
      listVideo.data.sort(() => 0.5 - Math.random());
      setVideos((prevVideos) => [...prevVideos, ...listVideo.data]);
      setPage(listVideo.meta);
    });
  };

  const handleRandomPage = (min, max) => {
    const countPage = max - 1 + min;
    const randomList = pageRandom.current;
    let page;
    if (randomList.length === countPage) {
      page = randomList[randomList.length - 1];
      return page;
    }
    do {
      page = Math.floor(Math.random() * countPage + min);
    } while (randomList.includes(page));

    randomList.push(page);
    return page;
  };

  useLayoutEffect(() => {
    if (positionCurrentElement > maxLength) {
      setPositionCurrentElement(maxLength);
    } else {
      indexInView.forEach((video, index) => {
        const isCurrentElm = index === positionCurrentElement;
        isCurrentElm && dispatch(updateInviewList({ index, isInView: isCurrentElm }));
      });
      handleScrollElement(positionCurrentElement);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionCurrentElement]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, []);

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
    //className="h-screen overflow-scroll overflow-x-hidden snap-y snap-mandatory" (snap)
    /*focus để khi reload sẽ tự focus*/
    //<div id="focus" tabIndex="1">
    <div className={cx('wrapper')}>
      <div ref={wrapperRef}>
        {videos.map((video, index) => {
          return (
            <VideoInfo
              key={video.id}
              data={video}
              index={index}
              priorVideo={priority}
              indexInView={index === priority && indexInView[index]?.isInView}
              currentElement={handleSetCurrentElement}
            />
          );
        })}
      </div>
      <InView onChange={(inView) => inView && handleGetPageRandom(handleRandomPage(1, page))}>
        {videos.length === 0 ? (
          <HomeAccountLoading />
        ) : (
          <i className={cx('auto-load-more')}>
            <TiktokLoading></TiktokLoading>
          </i>
        )}
      </InView>
    </div>
  );
}

export default Home;
