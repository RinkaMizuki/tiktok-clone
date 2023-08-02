import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faLock, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { ShareIcon, UserUndefine } from '~/components/Icons';
import TippyShare from '~/components/Tippy/TippyShare';
import { ModuleContext } from '~/context/ModalContext';
import { useContext } from 'react';
import { getCurrentProfileUser } from '~/services/userService';
import { useLocation } from 'react-router-dom';
import Image from '~/components/Images/Images';
import ProfileLoading from '~/components/Loadings/ProfileLoading';
const cx = classNames.bind(styles);
const active = cx('active');
const Profile = () => {
  const [isLoading, setIsloading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [urlList, setUrlList] = useState([]);
  const { pathname } = useLocation();
  const { handleShowModelProfile } = useContext(ModuleContext);
  const lineRef = useRef(null);
  const postRef = useRef(null);
  const favoritesRef = useRef(null);
  const likedRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const fetchDataCurrUser = async () => {
      setIsloading(true);
      const res = await getCurrentProfileUser(pathname);
      setCurrentUser({ ...res.data });
      setUrlList([res.data.facebook_url, res.data.twitter_url, res.data.youtube_url, res.data.website_url]);
      setIsloading(false);
    };
    fetchDataCurrUser();
  }, [pathname]);
  const handleMouseOverVideos = () => {
    lineRef.current.style.width = '128px';
    lineRef.current.style.transform = 'translateX(0)';
  };
  const handleMouseOverFavorite = () => {
    lineRef.current.style.width = '161.5px';
    lineRef.current.style.transform = 'translateX(127px)';
  };

  const handleMouseOverLiked = () => {
    lineRef.current.style.width = '130.7px';
    lineRef.current.style.transform = 'translateX(289.5px)';
  };

  const handleSelectVideos = () => {
    if (postRef.current.getAttribute('aria-selected') === 'true') {
      return;
    } else {
      if (favoritesRef.current.getAttribute('aria-selected') === 'true') {
        favoritesRef.current.setAttribute('aria-selected', false);
        favoritesRef.current.classList.remove(active);
      } else {
        likedRef.current.setAttribute('aria-selected', false);
        likedRef.current.classList.remove(active);
      }
      postRef.current.setAttribute('aria-selected', true);
      postRef.current.classList.add(active);
    }
  };

  const handleSelectFavorite = () => {
    if (favoritesRef.current.getAttribute('aria-selected') === 'true') {
      return;
    } else {
      if (postRef.current.getAttribute('aria-selected') === 'true') {
        postRef.current.setAttribute('aria-selected', false);
        postRef.current.classList.remove(active);
      } else {
        likedRef.current.setAttribute('aria-selected', false);
        likedRef.current.classList.remove(active);
      }
      favoritesRef.current.setAttribute('aria-selected', true);
      favoritesRef.current.classList.add(active);
    }
  };

  const handleSelectLiked = () => {
    if (likedRef.current.getAttribute('aria-selected') === 'true') {
      return;
    } else {
      if (postRef.current.getAttribute('aria-selected') === 'true') {
        postRef.current.setAttribute('aria-selected', false);
        postRef.current.classList.remove(active);
      } else {
        favoritesRef.current.setAttribute('aria-selected', false);
        favoritesRef.current.classList.remove(active);
      }
      likedRef.current.setAttribute('aria-selected', true);
      likedRef.current.classList.add(active);
    }
  };

  const handleMouseOverFeedTab = () => {
    if (likedRef.current.getAttribute('aria-selected') === 'true') {
      lineRef.current.style.width = '130.7px';
      lineRef.current.style.transform = 'translateX(289.5px)';
    } else if (favoritesRef.current.getAttribute('aria-selected') === 'true') {
      lineRef.current.style.width = '161.5px';
      lineRef.current.style.transform = 'translateX(127px)';
    } else {
      lineRef.current.style.width = '128px';
      lineRef.current.style.transform = 'translateX(0)';
    }
  };

  return (
    <div className={cx('Profile')}>
      {isLoading ? (
        <ProfileLoading />
      ) : (
        <>
          <div className={cx('info-user')}>
            <div className={cx('wrapper-info')}>
              <div className={cx('avatar')}>
                <Image src={currentUser?.avatar} alt={currentUser?.nickname} className={cx('custom-img')}/>
              </div>
              <div className={cx('name-container')}>
                <h1 className={cx('username')}>{currentUser.nickname}</h1>
                <h1 className={cx('nickname')}>{`${currentUser.last_name} ${currentUser.first_name}`}</h1>
                <div className={cx('edit-container')} onClick={handleShowModelProfile}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                  <p className={cx('edit-profile')}>Edit profile</p>
                </div>
              </div>
            </div>
            <div className={cx('fame-container')}>
              <strong>{currentUser.followings_count}</strong>
              <span>Following</span>
              <strong>{currentUser.followers_count}</strong>
              <span>Followers</span>
              <strong>{currentUser.likes_count}</strong>
              <span>Likes</span>
            </div>
            <h2 className={cx('bio-container')}>
              {currentUser.bio?.split('\n').map((substring, index) => {
                return (
                  <span key={index}>
                    {substring}
                    <br />
                  </span>
                );
              })}
            </h2>
            <div className={cx('url-container')}>
              {urlList.map((url, index) => {
                return (
                  <div key={index} className={cx('url-wrapper')}>
                    {url && <FontAwesomeIcon icon={faLink} className={cx('icon-url')} />}
                    <h1 className={cx('url-text')}>{url}</h1>
                  </div>
                );
              })}
            </div>
            <TippyShare
              placement="bottom-end"
              delay={[0, 500]}
              interactive={true}
              zIndex="998"
              className={cx('custom-placement')}
            >
              <div className={cx('share-icon')}>
                <ShareIcon className={cx('custom-icon')} />
              </div>
            </TippyShare>
          </div>
          <div className={cx('video-feedtab')} onMouseLeave={handleMouseOverFeedTab}>
            <p
              className={cx('post-video', {
                active,
              })}
              aria-selected="true"
              role="tab"
              tabIndex="0"
              ref={postRef}
              onMouseEnter={handleMouseOverVideos}
              onClick={handleSelectVideos}
            >
              <span>Videos</span>
            </p>
            <p
              className={cx('favorite-video')}
              aria-selected="false"
              role="tab"
              tabIndex="0"
              ref={favoritesRef}
              onMouseEnter={handleMouseOverFavorite}
              onClick={handleSelectFavorite}
            >
              <FontAwesomeIcon icon={faLock} />
              <span>Favorites</span>
            </p>
            <p
              className={cx('like-video')}
              aria-selected="false"
              role="tab"
              tabIndex="0"
              ref={likedRef}
              onMouseEnter={handleMouseOverLiked}
              onClick={handleSelectLiked}
            >
              <FontAwesomeIcon icon={faLock} />
              <span>Liked</span>
            </p>
            <div className={cx('bottom-line')} ref={lineRef}></div>
          </div>
          <main className={cx('detail-wrapper')}>
            <div className={cx('error-container')}>
              <UserUndefine className={cx('custom-icon-user')} />
              <p className={cx('title')}>Upload your first video</p>
              <p className={cx('desc')}>Your videos will appear here</p>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default Profile;