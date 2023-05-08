import Tippy from '@tippyjs/react/headless';
import Button from '~/components/Button/Button';
import { Wrapper as WrapperPopper } from '~/components/Popper';
import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { UserAuth } from '~/context/AuthContext';
import Image from '~/components/Images/Images';

const cx = classNames.bind(styles);

function AccountPreview({ data, children, label }) {
  const { user } = UserAuth();

  return (
    <div>
      {user && label === 'Following accounts' ? (
        <>{children}</>
      ) : (
        <Tippy
          delay={[1000, 400]}
          offset={[-20, 0]}
          interactive
          placement="bottom"
          render={(attrs) => (
            <div tabIndex="-1" {...attrs}>
              <WrapperPopper className={cx('wrapper')}>
                <div className={cx('header')}>
                  <Image className={cx('preview-avatar')} src={data.data.avatar} alt="user" />
                  <Button primary>Follow</Button>
                </div>
                <div className={cx('body')}>
                  <span className={cx('nickname')}>{data.data.nickname}</span>
                  {data.data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                  <p className={cx('name')}>{data.data.name}</p>
                  <p className={cx('footer')}>
                    <span>{`${data.data.follow}M`}</span>
                    <span>Follower</span>
                    <span>{`${data.data.like}M`}</span>
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
    </div>
  );
}

export default AccountPreview;
