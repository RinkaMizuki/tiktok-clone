import VideoInfo from './VideoInfo';
import { useRef, useState } from 'react';
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
const cx = classNames.bind(styles);

function Home() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(10);
  const isLogin = useSelector((state) => state.auth.login.isLogin);
  const dispatch = useDispatch();
  const TTL_COOKIES = document.cookie.split('=')[1];
  !TTL_COOKIES && isLogin && dispatch(logout());
  //ref
  const pageRandom = useRef([]);

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
      setVideos([...videos, ...listVideo.data]);
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

  return (
    //className="h-screen overflow-scroll overflow-x-hidden snap-y snap-mandatory" (snap)
    /*focus để khi reload sẽ tự focus*/
    //<div id="focus" tabIndex="1">
    <div className={cx('wrapper')}>
      {videos.map((video, index) => {
        return <VideoInfo key={index} data={video} index={index} />;
      })}
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
