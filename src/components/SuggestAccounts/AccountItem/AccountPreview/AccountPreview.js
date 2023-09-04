import Tippy from '@tippyjs/react/headless';
import Button from '~/components/Button/Button';
import { Wrapper as WrapperPopper } from '~/components/Popper';
import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { UserAuth } from '~/context/AuthContext';
import Image from '~/components/Images/Images';
import Follow from '~/components/Follow/Follow';

const cx = classNames.bind(styles);

function AccountPreview({ data, children, label, isFollowed }) {
  const { user } = UserAuth();
  return (
    <>
      {user && label === 'Following accounts' ? (
        <>{children}</>
      ) : (
        <Tippy
          appendTo={document.body}
          delay={[1000, 400]}
          offset={[-20, 0]}
          interactive
          zIndex={9999}
          placement="bottom"
          render={(attrs) => (
            <div tabIndex="-1" {...attrs}>
              <WrapperPopper className={cx('wrapper')}>
                <div className={cx('header')}>
                  <Image className={cx('preview-avatar')} src={data.avatar} alt="user" />
                  {!isFollowed ? (
                    <Button primary>Follow</Button>
                  ) : (
                    <Follow isCurrStateFollow={isFollowed} userId={data.id} />
                  )}
                </div>
                <div className={cx('body')}>
                  <span className={cx('nickname')}>{data.nickname}</span>
                  {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                  <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                  <p className={cx('footer')}>
                    <span>{`${data.followers_count}`}</span>
                    <span>Follower</span>
                    <span>{`${data.likes_count}`}</span>
                    <span>Likes</span>
                  </p>
                </div>
              </WrapperPopper>
            </div>
          )}
        >
          {children}
        </Tippy>
      )}
    </>
  );
}

export default AccountPreview;
