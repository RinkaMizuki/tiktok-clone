import classNames from 'classnames/bind';
import styles from './FormRegister.module.scss';
import { BackIcon } from '~/components/Icons';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '~/redux/apiRequests';
import { faCircleNotch, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function FormRegister({ onClick: handleBack }) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const registerFetching = useSelector((state) => state.auth?.register?.isFetching);
  const dispatch = useDispatch();
  const inputPasswordRef = useRef();
  const inputEmailRef = useRef();
  const submitRef = useRef(null);

  useEffect(() => {
    inputEmailRef.current.focus();
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const handleKeydown = (e) => {
    if (e.keyCode.toString() === '13') {
      submitRef?.current?.click();
    }
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setIsShowPassword(!isShowPassword);
  };
  if (isShowPassword) {
    inputPasswordRef.current?.setAttribute('type', 'text');
  } else {
    inputPasswordRef.current?.setAttribute('type', 'password');
  }
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const user = {
      email: inputEmail,
      password: inputPassword,
    };
    await registerUser(user, dispatch);
  };

  const handleInputPwd = (e) => {
    setInputPassword(e.target.value);
  };

  return (
    <form className={cx('wrapper-register')} onSubmit={handleSubmitForm}>
      <div className={cx('back-btn')} onClick={handleBack}>
        <BackIcon />
      </div>
      <div className={cx('title')}>Register</div>
      <p className={cx('type')}>Use phone or email</p>
      <div className={cx('form-register')}>
        <div className={cx('email')}>
          <input
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            type="text"
            placeholder="Use phone or email"
            ref={inputEmailRef}
          />
        </div>
        <div className={cx('password')}>
          <input
            value={inputPassword}
            onChange={(e) => handleInputPwd(e)}
            type="password"
            placeholder="Password"
            ref={inputPasswordRef}
          />

          <div className={cx('toggle-password')} onClick={handleShowPassword}>
            {isShowPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
          </div>
        </div>
      </div>
      {(!inputEmail || !inputPassword )? (
        <button className={cx('register-btn')} disabled>
          Register
        </button>
      ) : (
        <button className={cx('register-btn')} ref={submitRef} type="submit">
          {!registerFetching ? (
            'Register'
          ) : (
            <FontAwesomeIcon className={cx('loading')} icon={faCircleNotch} />
          )}
        </button>
      )}
    </form>
  );
}

export default FormRegister;
