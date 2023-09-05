import classNames from 'classnames/bind';
import styles from './VideoInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import VideoContent from '../VideoContent';
import { Wrapper as WrapperPopper } from '~/components/Popper';
import Image from '~/components/Images';
import Tippy from '@tippyjs/react/headless';
import Follow from '~/components/Follow';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { ModuleContext } from '~/context/ModalContext';

const cx = classNames.bind(styles);

function VideoInfo({ data, index }) {
  const { handleShowModalForm } = useContext(ModuleContext);
  const isLogin = useSelector((state) => state.auth.login.isLogin);
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
              <div tabIndex="-1" {...attrs}>
                <WrapperPopper className={cx('wrapper')}>
                  <div className={cx('header')}>
                    <Image className={cx('preview-avatar')} src={data.user.avatar} alt="user" />
                    {!isLogin ? (
                      <Button outline className={cx('preview-btn')} onClick={handleShowModalForm}>
                        Follow
                      </Button>
                    ) : (
                      <Follow userId={data.user_id} />
                    )}
                  </div>
                  <div className={cx('body')}>
                    <span className={cx('preview-nickname')}>{data.user.nickname}</span>
                    <p className={cx('preview-name')}>{data.user.first_name}</p>
                    <p className={cx('footer')}>
                      <span>{data.user.followers_count}</span>
                      <span>Follower</span>
                      <span>{data.user.likes_count}</span>
                      <span>Likes</span>
                    </p>
                  </div>
                </WrapperPopper>
              </div>
            )}
          >
            <div>
              <Image className={cx('avatar')} src={data.user.avatar} alt="Rinka Mizuki" />
            </div>
          </Tippy>
        </div>
        <div className={cx('desc')}>
          <div className={cx('info-user')}>
            <h3 className={cx('nickname')}>{data.user.nickname}</h3>
            <span className={cx('name')}>{data.user.first_name}</span>
          </div>
          <div className={cx('hashtag')}>
            <p>{data.description}</p>
          </div>
          <div className={cx('music')}>
            <FontAwesomeIcon className={cx('icon-music')} icon={faMusic} />
            <a href="#">{data.music}</a>
          </div>
        </div>
        <div className={cx('btn-follow')}>
          {!isLogin ? (
            <Button outline small onClick={handleShowModalForm}>
              Follow
            </Button>
          ) : (
            <Follow userId={data.user_id} isCurrStateFollow={data.user.is_followed} />
          )}
        </div>
      </div>
      <VideoContent data={data} index={index} />
    </div>
  );
}

export default VideoInfo;
