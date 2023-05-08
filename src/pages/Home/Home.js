import VideoInfo from './VideoInfo';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '~/firebase';
import { UserAuth } from '~/context/AuthContext';
import UploadVideoInfo from './UploadVideoInfo';
import UploadVideo from './UploadVideo/UploadVideo';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // document.querySelector('#focus').focus();
    const videosCollectionRef = collection(db, 'videos');
    getDocs(videosCollectionRef)
      .then((res) => {
        const vds = res.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setVideos(vds);
      })
      .catch((err) => console.error(err));
  }, []);

  const { videoList } = UserAuth();
  return (
    //className="h-screen overflow-scroll overflow-x-hidden snap-y snap-mandatory" (snap)
    /*focus để khi reload sẽ tự focus*/
    //<div id="focus" tabIndex="1">
    <>
      {videos.map((video, index) => (
        <VideoInfo key={index} data={video} />
      ))}
      {videoList.map((url, index) => (
        <div className={cx('container')} key={index}>
          <UploadVideoInfo />
          <UploadVideo data={url} />
        </div>
      ))}
    </>
    //</div>
  );
}

export default Home;
