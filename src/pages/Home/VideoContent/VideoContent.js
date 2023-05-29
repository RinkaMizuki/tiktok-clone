import classNames from 'classnames/bind';
import styles from './VideoContent.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useElementOnScreen } from '~/hooks';
import Tippy from '@tippyjs/react/headless';
import { CaretDownSmall, Email, Embed, Facebook, Line, Linked, LinkedIn, Pinterest, Send, Telegram, Twitter, WhatsApp } from '~/components/Icons';

const cx = classNames.bind(styles);

const listMediaSocial = [
  {
    icon: <Embed />,
    desc: "Embed",
  },
  {
    icon: <Send />,
    desc: "Send to friends",
  },
  {
    icon: <Facebook />,
    desc: "Share to Facebook",
  },
  {
    icon: <WhatsApp />,
    desc: "Share to WhatsApp",
  },
  {
    icon: <Linked />,
    desc: "Copy link",
  },
  {
    icon: <Twitter />,
    desc: "Share to Twitter",
  },
  {
    icon: <LinkedIn />,
    desc: "Share to LinkedIn",
  },
  {
    icon: <Email />,
    desc: "Share to Email",
  },
  {
    icon: <Telegram />,
    desc: "Share to Telegram",
  },
  {
    icon: <Line />,
    desc: "Share to Line",
  },
  {
    icon: <Pinterest />,
    desc: "Share to Pinterest",
  },
]


function VideoContent({ data }) {
  const [playing, setPlaying] = useState(false);
  const [itemList, setItemList] = useState(false);
  const videoRef = useRef();
  const caretRef = useRef();

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  };
  const isVisible = useElementOnScreen(options, videoRef);
  useEffect(() => {
    if (isVisible) {
      if (!playing) {
        videoRef.current.play();
        setPlaying(true);
      }
    } else {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
  }, [isVisible]);


  const loadListItem = itemList ? listMediaSocial.length : 5;

  const handleShowItem = () => {
    setItemList(true);
  }
  useEffect(() => {
    if (loadListItem > 5) {
      caretRef.current?.classList.add('hide-caret');
    } else {
      caretRef.current?.classList.remove('hide-caret');

    }
  }, [itemList])
  const handleHideTippy = () => {
    setItemList(false);
  }

  const {
    meta: {
      video: {
        resolution_x: videoWidth,
        resolution_y: videoHeight,
      }
    }
  } = data;

  const directionVideoClass = videoWidth - videoHeight > 0 ? 'horizontal' : 'vertical';
  return (
    <div className={cx('wrapper')}>
      <div className={cx('video-container', {
        [directionVideoClass]: directionVideoClass,
      })}>
        <img src={data.thumb_url} className={cx('thumb-video')}></img>
        <video ref={videoRef} src={data.file_url} className={cx('video')} muted controls loop></video>
      </div>

      <div className={cx('interactive')}>
        <button className={cx('btn-like')}>
          <span className={cx('icon-heart')}>
            <FontAwesomeIcon icon={faHeart} />
          </span>
          <strong className={cx('view')}>
            <span>{data.likes_count}</span>
          </strong>
        </button>

        <button className={cx('btn-cmt')}>
          <span className={cx('icon-heart')}>
            <FontAwesomeIcon icon={faComment} />
          </span>
          <strong className={cx('view')}>
            <span>{data.comments_count}</span>
          </strong>
        </button>

        <div>
          <Tippy
            delay={[0, 500]}
            interactive
            placement="top"
            onHide={handleHideTippy}
            render={(attrs) => (
              <div tabIndex="-1" {...attrs} >
                <div {...attrs} tabIndex="-1" className={cx('tippy-container')}>
                  <div className={cx('share-wrapper')}>
                    {listMediaSocial.slice(0, loadListItem).map((item, index) => (
                      <a href='#' key={index} className={cx('item-wrapper')}>
                        {item.icon}
                        <span className={cx('item-text')}>{item.desc}</span>
                      </a>
                    ))}
                    <a ref={caretRef} href='#' className={cx('item-wrapper', {
                      'item-caret-down': 'item-caret-down',
                    })} onClick={handleShowItem}>
                      {itemList ? null : <CaretDownSmall />}
                    </a>
                  </div>
                </div>
              </div>
            )}
          >
            <button className={cx('btn-share')}>
              <span className={cx('icon-heart')}>
                <FontAwesomeIcon icon={faShare} />
              </span>
              <strong className={cx('view')}>
                <span>{data.shares_count}</span>
              </strong>
            </button>
          </Tippy>
        </div>
      </div>
    </div>
  );
}

export default VideoContent;