import classNames from 'classnames/bind';
import styles from './VideoInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import VideoContent from '../VideoContent';
import { Wrapper as WrapperPopper } from '~/components/Popper';
import Image from '~/components/Images';
import Tippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);

function VideoInfo({ data }) {
  return (
    <div className={cx('content')}>
      <div className={cx('container')}>
        <div>
          <Tippy
            delay={[1000, 400]}
            offset={[120, 5]}
            interactive
            placement="bottom"
            render={(attrs) => (
              <div tabIndex="-1" {...attrs} >
                <WrapperPopper className={cx('wrapper')}>
                  <div className={cx('header')}>
                    <Image className={cx('preview-avatar')} src={data.data.avatar} alt="user" />
                    <Button outline className={cx('preview-btn')}>Follow</Button>
                  </div>
                  <div className={cx('body')}>
                    <span className={cx('preview-nickname')}>{data.data.nickname}</span>
                    <p className={cx('preview-name')}>{data.data.name}</p>
                    <p className={cx('footer')}>
                      <span>{`10.3M`}</span>
                      <span>Follower</span>
                      <span>{`23.4M`}</span>
                      <span>Likes</span>
                    </p>
                  </div>
                </WrapperPopper>
              </div>
            )}
          >
            <div>
              <Image className={cx('avatar')} src={data.data.avatar} alt="Rinka Mizuki" />
            </div>
          </Tippy>
        </div>
        <div className={cx('desc')}>
          <div className={cx('info-user')}>
            <h3 className={cx('nickname')}>{data.data.nickname}</h3>
            <span className={cx('name')}>{data.data.name}</span>
          </div>
          <div className={cx('hashtag')}>
            <p>{data.data.content}</p>
            <strong>
              <a href="#">{data.data.tag}</a>
            </strong>
            <strong>
              <a href="#">#j4f</a>
            </strong>
          </div>
          <div className={cx('music')}>
            <FontAwesomeIcon className={cx('icon-music')} icon={faMusic} />
            <a href="#">nhạc nền - Yomein was a popular idol</a>
          </div>
        </div>
        <div className={cx('btn-follow')}>
          <Button outline small>
            Follow
          </Button>
        </div>
      </div>
      <VideoContent data={data} />
    </div>
  );
}

export default VideoInfo;
