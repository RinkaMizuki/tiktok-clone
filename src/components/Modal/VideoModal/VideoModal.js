import classNames from 'classnames/bind';
import styles from './VideoModal.module.scss';
import Tippy from '@tippyjs/react/headless';
import { useSpring, animated } from 'react-spring';
import 'tippy.js/animations/shift-away.css';
import TippyShare from '~/components/Tippy/TippyShare';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Arrow,
  CancelIcon,
  CommentIcon,
  Emoji,
  FlagIcon,
  HashTag,
  HeartIcon,
  HeartIconRegular,
  IconSearch,
  MenuIcon,
  ShareIcon,
} from '~/components/Icons';
import { Embed, Facebook, Send, Twitter, WhatsApp } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useControl } from '~/hooks';
import { faMusic, faVolumeHigh, faVolumeMute, faPlay, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import TiktokLoading from '~/components/Loadings/TiktokLoading';
import Follow from '~/components/Follow';
import { getListVideoOfUser, getVideo } from '~/services/videoService';
import Image from '~/components/Images/Images';
import { getListComment } from '~/services/commentService';
import { ModalContext } from '~/context/ModalContext';
import { setIdVideoPlay } from '~/redux/videoSlice';

const cx = classNames.bind(styles);

const VideoModal = ({ onHideModal }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [video, setVideo] = useState({});
  const [listComment, setListComment] = useState([]);
  const [videoListUser, setVideoListUser] = useState([]);
  const [indexVideoOfUser, setIndexVideoOfUser] = useState(-1);
  const [copyLink, setCopyLink] = useState('');

  const [active, setActive] = useState('comment');
  const [urlOrigin, setUrlOrigin] = useState('/');

  const [isLoading, setIsLoading] = useState(false);

  const tabCommentContainerRef = useRef(null);
  const tabVideoContainerRef = useRef(null);
  const tabVideoRef = useRef(null);
  const tabCommentRef = useRef(null);
  const wrapperRef = useRef(null);
  const linkRef = useRef(null);
  const menuRef = useRef(null);

  const initialStyles = { opacity: 0 };
  const [props, setSpring] = useSpring(() => initialStyles);
  const [prop1, setSpring1] = useSpring(() => initialStyles);
  const dispatch = useDispatch();

  const muted = useSelector((state) => state.video.isMuted);
  const videoId = useSelector((state) => state.video.videoId);
  const nicknameCurrUser = useSelector((state) => state.video.nicknameUser);
  const userId = useSelector((state) => state.video.userId);
  const isLogin = useSelector((state) => state.auth.login.isLogin);

  const { handleShowModalForm: onShowModalFormLogin } = useContext(ModalContext);

  const {
    handleAdjustVolume,
    handleMutedVideo,
    handleSetFinalVolume,
    handleMouseInto,
    handleMouseOut,
    handleChangeTime,
    handleUpdateTimer,
    handleWaitingVideo,
    handlePlayingVideo,
    timer,
    timerCircleRef,
    timerTrackRef,
    timerRef,
    videoRef,
    volumeControlRef,
    adjustRef,
    selectorRef,
    volumeMutedRef,
    volumeBarRef,
    isLoadingVideo,
  } = useControl(video?.meta?.playtime_seconds);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (window.location.pathname.includes(`/@${nicknameCurrUser}`)) {
      //profile
      const currPathname = window.location.pathname;
      if (currPathname !== `/@${nicknameCurrUser}/video/${videoId}` && currPathname !== `/@${nicknameCurrUser}`) {
        window.history.replaceState(null, '', `/@${nicknameCurrUser}/video/${videoId}`);
      } else {
        //first modal
        window.history.pushState({}, null, `${currPathname}/video/${videoId}`);
      }
    } else {
      //home
      window.history.pushState({}, null, `@${nicknameCurrUser}/video/${videoId}`);
    }
  }, [videoId, nicknameCurrUser]);

  useLayoutEffect(() => {
    setIsLoading(true);
    const getListCommentById = async () => {
      const listComment = await getListComment(videoId);
      setListComment(listComment);
    };

    isLogin && getListCommentById();

    if (indexVideoOfUser >= 0) {
      const arrUrl = urlOrigin.split('/');
      const idFirstVideoModal = Number(arrUrl[arrUrl.length - 1]);
      if (idFirstVideoModal === videoId) {
        for (let index = 0; index < videoListUser.length; index++) {
          const { id } = videoListUser[index];
          if (id === idFirstVideoModal) setVideo(videoListUser[index]);
        }
      } else {
        setVideo(videoListUser[indexVideoOfUser]);
      }
    }

    setIsLoading(false);
  }, [videoId, indexVideoOfUser]);

  useEffect(() => {
    const borderActive = '2px solid rgba(255, 255, 255, 0.9';
    const borderNonActive = 'none';
    const colorActive = 'rgba(255, 255, 255, 0.9';
    const colorNonActive = 'rgba(255, 255, 255, 0.3';
    if (active === 'comment') {
      tabCommentContainerRef.current.style.borderBottom = borderActive;
      tabVideoContainerRef.current.style.borderBottom = borderNonActive;
      tabCommentRef.current.style.color = colorActive;
      tabVideoRef.current.style.color = colorNonActive;
    } else {
      tabCommentRef.current.style.color = colorNonActive;
      tabVideoRef.current.style.color = colorActive;
      tabVideoContainerRef.current.style.borderBottom = borderActive;
      tabCommentContainerRef.current.style.borderBottom = borderNonActive;
      //scroll to video user playing
      const videoListNode = wrapperRef.current?.childNodes;
      if (videoListNode) {
        const arr = Array.from(videoListNode);
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].attributes[0].value !== ' ') {
            const indexToScroll = arr[i].attributes[0].value;
            videoListNode[indexToScroll].scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        }
      }
    }
  }, [active]);

  useEffect(() => {
    const getListVideoUser = async () => {
      const listVideoUser = await getListVideoOfUser(userId);
      setVideoListUser(listVideoUser);
    };
    const getVideoById = async () => {
      const data = await getVideo(videoId);
      setVideo(data);
    };
    getVideoById();
    getListVideoUser();
    setUrlOrigin(window.location.pathname);

    document.addEventListener('keydown', handleKeydown);

    return () => document.removeEventListener('keydown', handleKeydown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowVideoUserModal = (e) => {
    const indexVideoClicked = e.target.attributes[0].value;
    const { id: videoId } = videoListUser[indexVideoClicked];
    dispatch(setIdVideoPlay(videoId));
    setIndexVideoOfUser(indexVideoClicked);
  };

  const handleKeydown = (e) => {
    //pre
    const ARROW_UP = 38;
    const ARROW_DOWN = 40;
    if (e.keyCode === ARROW_UP) {
      e.preventDefault();
    }
    //next
    if (e.keyCode === ARROW_DOWN) {
      e.preventDefault();
    }
  };

  const handleBackToFirstModal = () => {
    onHideModal(urlOrigin);
    const idFirstModal = urlOrigin.split('/');
    dispatch(setIdVideoPlay(Number(idFirstModal[idFirstModal.length - 1])));
  };
  function onMount() {
    setSpring({
      opacity: 1,
      onRest: () => {},
      config: { duration: 0 },
    });
  }

  function onHide() {
    setSpring({
      ...initialStyles,
      onRest: () => {},
      config: { tension: 300, duration: 100 },
    });
  }

  function onMount1() {
    setSpring1({
      opacity: 1,
      onRest: () => {},
      config: { duration: 0 },
    });
  }

  function onHide1() {
    setSpring1({
      ...initialStyles,
      onRest: () => {},
      config: { tension: 300, duration: 100 },
    });
  }
  const handleToggleVideo = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMouseVideoUser = (e) => {
    if (!e.target) return;
    e.target.nextElementSibling.play();
    e.target.nextElementSibling.style.zIndex = 3;
  };

  const handleLeaveVideoUser = (e) => {
    if (!e.target) return;
    e.target.pause();
    e.target.currentTime = 0;
    e.target.style.zIndex = -1;
  };

  return (
    <div className={cx('modal-container')}>
      <div className={cx('video-container')}>
        {urlOrigin === window.location.pathname && (
          <div className={cx('search-bar-container')}>
            <div className={cx('search-bar-background')}></div>
            <div className={cx('search-box-container')}>
              <div className={cx('search-input-container')}>
                <input type="text" placeholder="Tìm nội dung liên quan" className={cx('input-search-content')} />
                <span className={cx('span-spliter')}></span>
                <button className={cx('btn-search')}>
                  <div className={cx('search-icon-container')}>
                    <IconSearch className={cx('custom-btn-search')} />
                  </div>
                </button>
                <div className={cx('input-border-container')}></div>
              </div>
            </div>
          </div>
        )}
        <div className={cx('video-blur-background')}>
          <span className={cx('wrapper-picture')}>
            <picture>
              <source type="image/avif" src={video.thumb_url} />
              <Image alt="background-blur" src={video.thumb_url} className={cx('custom-image')} />
            </picture>
          </span>
        </div>
        <div className={cx('video-wrapper')} onClick={handleToggleVideo}>
          <div className={cx('video-background-blur')}>
            <div className={cx('video-layout-wrapper')}>
              <video
                className={cx('video-custom')}
                src={video.file_url}
                ref={videoRef}
                loop
                autoPlay
                onTimeUpdate={handleUpdateTimer}
                onWaiting={handleWaitingVideo}
                onPlaying={handlePlayingVideo}
              />
              {isLoadingVideo && (
                <div className={cx('position')}>
                  <TiktokLoading medium={true} />
                </div>
              )}
            </div>
          </div>
          {video?.meta?.playtime_seconds && (
            <div className={cx('video-control-container')}>
              <div className={cx('time-duration-container')}>
                <div className={cx('time-duration')}>
                  <div className={cx('timer-control')}></div>
                  <input
                    ref={timerCircleRef}
                    className={cx('input')}
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={isNaN(timer) ? 0 : timer}
                    onInput={handleChangeTime}
                    onMouseUp={() => videoRef.current.play()}
                  />
                  <div className={cx('time-duration-track')} ref={timerTrackRef}></div>
                </div>
                <div className={cx('display-timer')} ref={timerRef}></div>
              </div>
            </div>
          )}
        </div>
        {!isPlaying && <FontAwesomeIcon icon={faPlay} className={cx('play-icon')} />}
        {urlOrigin === window.location.pathname ? (
          <button className={cx('close-btn-container')} onClick={() => onHideModal()}>
            <CancelIcon className={cx('custom-close-icon')} width="2.5rem" height="2.5rem" />
          </button>
        ) : (
          <button className={cx('custom-btn-close')} onClick={handleBackToFirstModal}>
            <CancelIcon className={cx('custom-close-icon')} width="2.5rem" height="2.5rem" />
            <span className={cx('text-close')}>Click to back first modal</span>
          </button>
        )}
        <div
          className={cx('volume-container', {
            animation: 'animation',
          })}
        >
          <div onMouseEnter={handleMouseInto} onMouseLeave={handleMouseOut}>
            <div ref={volumeControlRef} className={cx('volume-control')}>
              <div className={cx('volume-bar')} ref={volumeBarRef}>
                <input
                  className={cx('input')}
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  onChange={(e) => handleAdjustVolume(e.target.value)}
                  onMouseUp={(e) => handleSetFinalVolume(e.target.value)}
                  ref={adjustRef}
                />
                <div className={cx('selector')} ref={selectorRef}></div>
              </div>
            </div>
            {!muted ? (
              <FontAwesomeIcon className={cx('custom-icon')} icon={faVolumeHigh} onClick={handleMutedVideo} />
            ) : (
              <FontAwesomeIcon
                className={cx('custom-icon', {
                  showing: muted,
                })}
                icon={faVolumeMute}
                ref={volumeMutedRef}
                onClick={handleMutedVideo}
              />
            )}
          </div>
        </div>
        <button className={cx('arrow-video-switch', 'arrow-up')}>
          <Arrow />
        </button>
        <button className={cx('arrow-video-switch', 'arrow-down')}>
          <Arrow />
        </button>
        {urlOrigin === window.location.pathname ? (
          <Tippy
            interactive
            placement="bottom-end"
            offset={[0, 0]}
            delay={[0, 100]}
            render={(attrs) => (
              <animated.div className={cx('popper-container')} tabIndex="-1" {...attrs} style={props}>
                <ul className={cx('popup-container')}>
                  <li className={cx('item-wrapper')}>
                    <div className={cx('icon-wrapper')}>
                      <FontAwesomeIcon icon={faHeart} style={{ width: '1.8rem', height: '1.8rem' }} />
                    </div>
                    <span className={cx('item-text')}>Không quan tâm</span>
                  </li>
                  <li className={cx('item-wrapper')}>
                    <div className={cx('icon-wrapper')}>
                      <FlagIcon />
                    </div>
                    <span className={cx('item-text')}>Báo cáo</span>
                  </li>
                </ul>
              </animated.div>
            )}
            animation={true}
            onMount={onMount}
            onHide={onHide}
          >
            <button className={cx('menu-btn-container')}>
              <MenuIcon className={cx('custom-menu-icon')} width="2.5rem" height="2.5rem" />
            </button>
          </Tippy>
        ) : (
          <div className={cx('report-wrapper')}>
            <FlagIcon width="400" height="450" marginBottom="0" />
            <span style={{ marginLeft: '5px' }}>Báo cáo</span>
          </div>
        )}
      </div>
      <div className={cx('content-container')}>
        <div className={cx('description-content-wrapper')}>
          <div className={cx('info-container')}>
            <a href="#" className={cx('style-link')}>
              <div className={cx('avatar-container')}>
                <Image src={video.user?.avatar} alt="avatar" className={cx('image-avatar')} />
              </div>
            </a>
            <a href="#" className={cx('info-content')}>
              <span className={cx('nickname')}>{video.user?.nickname}</span>
              <br />
              <span className={cx('username')}>
                {`${video.user?.first_name} ${video.user?.last_name}`}
                <span style={{ margin: '0px 4px' }}>.</span>
                <span>{video.created_at}</span>
              </span>
            </a>
            <Follow isCurrStateFollow={true} />
          </div>
          <div className={cx('main-content')}>
            <div className={cx('tag-wrapper')}>
              <div className={cx('overflow-container')}>
                <span className={cx('span-text')}>{video.description}</span>
              </div>
            </div>
            <h4 className={cx('music-link')}>
              <FontAwesomeIcon className={cx('icon-music')} icon={faMusic} />
              <span>{video.music}</span>
            </h4>
          </div>
        </div>
        <div className={cx('main-content')}>
          <div className={cx('media-container')}>
            <div className={cx('react-container')}>
              <div className={cx('react-content')}>
                <button className={cx('btn-action')}>
                  <HeartIcon className={cx('custom-icon-action')} />
                  <strong>{video.likes_count}</strong>
                </button>
                <button className={cx('btn-action')}>
                  <CommentIcon className={cx('custom-icon-action')} />
                  <strong>{video.comments_count}</strong>
                </button>
                <button className={cx('btn-action')}>
                  <FontAwesomeIcon icon={faBookmark} className={cx('custom-icon-action', 'bookmark-icon')} />
                  <strong>{video.shares_count}</strong>
                </button>
              </div>
              <div className={cx('social-media-container')}>
                <span className={cx('wrapper-icon')}>
                  <Embed isFill={true} />
                </span>
                <span className={cx('wrapper-icon')}>
                  <Send />
                </span>
                <span className={cx('wrapper-icon')}>
                  <Facebook />
                </span>
                <span className={cx('wrapper-icon')}>
                  <WhatsApp />
                </span>
                <span className={cx('wrapper-icon')}>
                  <Twitter />
                </span>
                <TippyShare
                  placement="bottom-end"
                  delay={[0, 500]}
                  interactive={true}
                  zIndex="998"
                  className={cx('custom-placement')}
                  isShowLess={true}
                >
                  <span style={{ cursor: 'pointer' }}>
                    <ShareIcon />
                  </span>
                </TippyShare>
              </div>
            </div>
            <div className={cx('copy-link-container')}>
              <p className={cx('copy-link-text')} ref={linkRef}>
                {window.location.href}
              </p>
              <CopyToClipboard text={copyLink}>
                <button className={cx('btn-clipbroad')} onClick={() => setCopyLink(linkRef.current.innerText)}>
                  Sao chép liên kết
                </button>
              </CopyToClipboard>
            </div>
            <div className={cx('tab-menu-container')}>
              <div
                className={cx('tab-item-container')}
                onClick={() => setActive('comment')}
                ref={tabCommentContainerRef}
              >
                <span className={cx('tab-item')} ref={tabCommentRef}>
                  Bình luận ({video.comments_count})
                </span>
              </div>
              <div className={cx('tab-item-container')} onClick={() => setActive('video')} ref={tabVideoContainerRef}>
                <span className={cx('tab-item')} ref={tabVideoRef}>
                  Video của nhà sáng tạo
                </span>
              </div>
            </div>
          </div>
        </div>
        {active === 'comment' ? (
          <div className={cx('comment-content-container')}>
            <div className={cx('comment-list-container')}>
              {isLogin &&
                listComment?.map((comment, index) => (
                  <div className={cx('commemt-item')} key={comment?.id}>
                    <div className={cx('comment-content-wrapper')}>
                      <a href="#" className={cx('user-link-avatar')}>
                        <Image src={comment.user?.avatar} alt="avatar" />
                      </a>
                      <div className={cx('comment-content')}>
                        <a href="#" className={cx('comment-username')}>
                          <span>{`${comment.user?.first_name} ${comment.user?.last_name}`}</span>
                        </a>
                        <p className={cx('comment-text')}>
                          <span>{comment?.comment}</span>
                        </p>
                        <div className={cx('comment-sub-cotent')}>
                          <span className={cx('comment-created-at')}>{comment?.created_at}</span>
                          <span className={cx('comment-reply')}>Reply</span>
                        </div>
                      </div>
                      <div className={cx('comment-action')}>
                        <Tippy
                          interactive
                          placement="bottom-end"
                          offset={[0, 0]}
                          delay={[0, 100]}
                          render={(attrs) => (
                            <animated.div className={cx('popper-container')} tabIndex="-1" {...attrs} style={prop1}>
                              <div className={cx('popup-report-container')}>
                                <div className={cx('popup-report-content')}>
                                  <p className={cx('action-item')}>
                                    <FlagIcon width="400" height="450" marginBottom="0" />
                                    <span className={cx('span-action')}>Báo cáo</span>
                                  </p>
                                </div>
                              </div>
                            </animated.div>
                          )}
                          animation
                          onHide={onHide1}
                          onMount={onMount1}
                        >
                          <div ref={menuRef} className={cx('custom-menu-icon', 'display-menu')}>
                            <MenuIcon width="2.2rem" height="2.2rem" />
                          </div>
                        </Tippy>
                        <div className={cx('like-wrapper')}>
                          <HeartIconRegular />
                          <span className={cx('like-count')}>{comment?.likes_count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className={cx('list-container')}>
            <div className={cx('video-list-container')} ref={wrapperRef}>
              {videoListUser.map((videoUser, index) => (
                <div
                  data-index={videoId === videoUser?.id ? index : ' '}
                  className={cx('item-container')}
                  key={videoUser?.id}
                >
                  <div className={cx('cover-container')}>
                    <Image
                      src={videoUser?.thumb_url}
                      alt="background-video"
                      onMouseEnter={handleMouseVideoUser}
                      className={cx('image-user-create')}
                    />
                    {videoId === videoUser?.id && (
                      <div className={cx('playing-mark-container')}>
                        <div className={cx('playing-mask-wrapper')}>
                          <div className={cx('wrapper-icon-animation')}>
                            <div className={cx('music-waves-2')}>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                          </div>
                          <span className={cx('text-play')}>Hiện đang phát</span>
                        </div>
                      </div>
                    )}
                    {videoId !== videoUser?.id && (
                      <video
                        data-index={index}
                        className={cx('video-user-create')}
                        src={videoUser?.file_url}
                        muted
                        loop
                        onMouseLeave={handleLeaveVideoUser}
                        onClick={handleShowVideoUserModal}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className={cx('scroll-button-container')}></div>
          </div>
        )}
        <div className={cx('edit-comment-container')}>
          {isLogin ? (
            <div className={cx('edit-content-wrapper')}>
              <div className={cx('edit-content-layout')}>
                <div className={cx('input-area-container')}>
                  <div className={cx('input-editor-container')}>
                    <input type="text" placeholder="Thêm bình luận" />
                  </div>
                  <div className={cx('mention-btn')}>
                    <HashTag width="2.2rem" height="2.2rem" className={cx('custom-post-icon')} />
                  </div>
                  <div className={cx('emoji-btn')}>
                    <Emoji width="2.2rem" height="2.2rem" className={cx('custom-post-icon')} />
                  </div>
                </div>
              </div>
              <button className={cx('post-comment')}>Post</button>
            </div>
          ) : (
            <div className={cx('login-bar')} onClick={onShowModalFormLogin}>
              Login to comment
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
