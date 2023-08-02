import classNames from 'classnames/bind';
import styles from './ModalForm.module.scss';
import { CancelIcon } from '../../Icons';
import React, { useEffect, useRef, useState } from 'react';
import FormMethodLogin from './FormMethodLogin';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import FormMethodRegister from './FormMethodRegister/FormMethodRegister';
import { useDispatch, useSelector } from 'react-redux';
import Notify from '~/components/Notify';
import { resetLogin, resetRegister } from '~/redux/authSlice';

const cx = classNames.bind(styles);

function ModalForm({ onHideModal }) {
  const [isClosed, setIsClosed] = useState(false);
  const [isShowMethodLogin, setIsShowMethodLogin] = useState(true);
  const [isShowFormLogin, setIsShowFormLogin] = useState(false);
  const [isShowFormRegister, setIsShowFormRegister] = useState(false);

  const dispatch = useDispatch();
  const errRef = useRef(null);

  const loginFetching = useSelector((state) => state.auth?.login?.isFetching);
  const isLogin = useSelector((state) => state.auth?.login?.isLogin);
  const isLoginError = useSelector((state) => state.auth.login.error);
  const loginMessage = useSelector((state) => state.auth.login.message);
  const registerFetching = useSelector((state) => state.auth?.register?.isFetching);
  const isRegister = useSelector((state) => state.auth?.register?.isRegister);
  const isRegisterError = useSelector((state) => state.auth.register.error);
  const registerMessage = useSelector((state) => state.auth.register.message);
  const errEmail = registerMessage?.email;
  const errPassword = registerMessage?.password;

  const handleCloseModal = () => {
    dispatch(resetLogin());
    dispatch(resetRegister());
    setIsClosed(true);
    setTimeout(() => {
      onHideModal();
    }, 220);
  };

  useEffect(() => {
    if (!isRegisterError && isRegister) {
      setTimeout(() => {
        dispatch(resetRegister());
      }, 1000);
      handleShowMethodLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegisterError, isRegister]);

  const handleShowMethodLogin = () => {
    setIsShowMethodLogin(!isShowMethodLogin);
    setIsShowFormLogin(false);
  };
  const handleBackForm = () => {
    isShowMethodLogin ? setIsShowFormLogin(false) : setIsShowFormRegister(false);
  };

  const handleShowMethodRegister = () => {
    setIsShowMethodLogin(!isShowMethodLogin);
    setIsShowFormRegister(false);
  };
  const handleShowFormLogin = () => {
    setIsShowFormLogin(!isShowFormLogin);
  };
  const handleShowFormRegister = () => {
    setIsShowFormRegister(!isShowFormRegister);
    setIsShowFormLogin(false);
  };

  return (
    <div className={cx('modal-mask')}>
      {(isLogin || isLoginError || isRegister || isRegisterError) && (
        <div
          ref={errRef}
          className={cx('notify-success', {
            show: !loginFetching && !registerFetching,
          })}
        >
          <Notify
            message={
              isRegister || isRegisterError
                ? isRegisterError
                  ? `${errEmail ?? ''} ${errPassword ?? ''}`
                  : registerMessage
                : loginMessage
            }
          />
        </div>
      )}
      <div
        className={cx('wrapper', {
          animationShow: !isClosed,
          animationHide: isClosed,
        })}
      >
        <div className={cx('container')}>
          {isShowMethodLogin ? (
            isShowFormLogin ? (
              <FormLogin onClick={handleBackForm} />
            ) : (
              <FormMethodLogin onStateChangeFormLogin={handleShowFormLogin} />
            )
          ) : isShowFormRegister ? (
            <FormRegister onClick={handleBackForm} />
          ) : (
            <FormMethodRegister onStateChangeFormRegister={handleShowFormRegister} />
          )}
          {isShowFormRegister || isShowMethodLogin === false ? (
            <div className={cx('agreement')}>
              <p className={cx('atext')}>
                By continuing, you agree to TikTok's{' '}
                <a
                  href="https://www.tiktok.com/legal/page/row/terms-of-service/en"
                  target="_blank"
                  rel="noreferrer"
                  className={cx('alink')}
                >
                  Terms of Service
                </a>{' '}
                and confirm that you have read TikTok's{' '}
                <a
                  href="https://www.tiktok.com/legal/page/row/privacy-policy/en"
                  target="_blank"
                  rel="noreferrer"
                  className={cx('alink')}
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          ) : null}
          <div className={cx('footer')}>
            {isShowMethodLogin ? (
              <div className={cx('notify')}>
                Don't have an account?
                <p onClick={handleShowMethodRegister}> Sign up</p>
              </div>
            ) : (
              <div className={cx('notify')}>
                Already have an account?
                <p onClick={handleShowMethodLogin}> Log in </p>
              </div>
            )}
          </div>
        </div>
        <div className={cx('close-btn')} onClick={handleCloseModal}>
          <CancelIcon className={cx('cancel-icon')} />
        </div>
      </div>
    </div>
  );
}
export default ModalForm;
