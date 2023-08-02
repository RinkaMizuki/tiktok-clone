import classNames from 'classnames/bind';
import styles from './FormMethodLogin.module.scss';
import { Apple, Facebook, Google, Instagram, KaKaoTalk, Line, QR, Twitter, User } from '../../../Icons';
import React from 'react';
import Button from '../../../Button';
import { UserAuth } from '~/context/AuthContext';
import { useDispatch } from 'react-redux';
import { resetRegister } from '~/redux/authSlice';

const cx = classNames.bind(styles);

const listMediaSocial = [
  {
    icon: <QR />,
    desc: 'Use QR code',
  },
  {
    icon: <User />,
    desc: 'Use phone / email / username',
  },
  {
    icon: <Facebook />,
    desc: 'Coutinue with Facebook',
  },
  {
    icon: <Google />,
    desc: 'Continue with Google',
  },
  {
    icon: <Twitter />,
    desc: 'Continue with Twitter',
  },
  {
    icon: <Line />,
    desc: 'Continue with Line',
  },
  {
    icon: <KaKaoTalk />,
    desc: 'Continue with KaKaoTalk',
  },
  {
    icon: <Apple />,
    desc: 'Continue with Apple',
  },
  {
    icon: <Instagram />,
    desc: 'Continue with Instagram',
  },
];

function FormMethodLogin({ onStateChangeFormLogin }) {
  const { googleSignIn } = UserAuth();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      console.log(err);
    }
  };

  const dispatch = useDispatch();
  const handleChooseMethodLogin = () => {
    dispatch(resetRegister());
    onStateChangeFormLogin();
  };

  return (
    <div className={cx('inner')}>
      <div className={cx('title')}>Log in to TikTok</div>
      <div className={cx('list')}>
        {listMediaSocial.map((media, index) => {
          if (index === 3) {
            return (
              <React.Fragment key={index}>
                <Button text className={cx('btn-form-login')} onClick={handleGoogleSignIn}>
                  <div className={cx('wrapper-icon')}>
                    <span className={cx('icon')}>{media.icon}</span>
                    <span>{media.desc}</span>
                  </div>
                </Button>
              </React.Fragment>
            );
          } else if (index === 1) {
            return (
              <React.Fragment key={index}>
                <Button text className={cx('btn-form-login')} onClick={handleChooseMethodLogin}>
                  <div className={cx('wrapper-icon')}>
                    <span className={cx('icon')}>{media.icon}</span>
                    <span>{media.desc}</span>
                  </div>
                </Button>
              </React.Fragment>
            );
          }
          return (
            <React.Fragment key={index}>
              <Button text className={cx('btn-form-login')}>
                <div className={cx('wrapper-icon')}>
                  <span className={cx('icon')}>{media.icon}</span>
                  <span>{media.desc}</span>
                </div>
              </Button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default FormMethodLogin;
