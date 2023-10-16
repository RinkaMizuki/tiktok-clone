import { VideoInfo, VideoContent } from '~/components/Videos';
import { useContext, useRef, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '~/firebase';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { videoService } from '~/services/videoService';
import { InView } from 'react-intersection-observer';
import TiktokLoading from '~/components/Loadings/TiktokLoading';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/redux/authSlice';
import HomeAccountLoading from '~/components/Loadings/HomeAccountLoading';
import { useEffect } from 'react';
import { VideoContext } from '~/context/VideoContext';
import { setCurrentListVideo } from '~/redux/videoSlice';
const cx = classNames.bind(styles);

function Home() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(10);
  const [priority, setPriority] = useState(0);

  const dispatch = useDispatch();

  //selector
  const isLogin = useSelector((state) => state.auth.login.isLogin);
  const indexInView = useSelector((state) => state.video.indexListInView);
  const listenEvent = useSelector((state) => state.video.listenEvent);

  const TTL_COOKIES = document.cookie.split('=')[1];
  !TTL_COOKIES && isLogin && dispatch(logout());
  //ref
  const pageRandom = useRef([]);

  //context
  const { handleKeydown, wrapperRef } = useContext(VideoContext);

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
      setVideos((prevVideos) => {
        dispatch(setCurrentListVideo([...prevVideos, ...listVideo.data]));
        return [...prevVideos, ...listVideo.data];
      });
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

  useEffect(() => {
    listenEvent === 'Home' && document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listenEvent]);

  return (
    //className="h-screen overflow-scroll overflow-x-hidden snap-y snap-mandatory" (snap)
    /*focus để khi reload sẽ tự focus*/
    //<div id="focus" tabIndex="1">
    <div className={cx('wrapper')}>
      <div ref={wrapperRef}>
        {videos.map((video, index) => {
          return (
            <div className={cx('content')} key={video.id}>
              <VideoInfo data={video} />
              <VideoContent
                data={video}
                index={index}
                priorVideo={priority}
                indexInView={index === priority && indexInView[index]?.isInView}
              />
            </div>
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
