import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FormLogin.module.scss';
import { BackIcon } from '~/components/Icons';
import { loginUser } from '~/redux/apiRequests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function FormLogin({ onClick }) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPwd] = useState('');

  const inputPasswordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginFetching = useSelector((state) => state.auth?.login?.isFetching);
  const isLogin = useSelector((state) => state.auth?.login?.isLogin);
  const isLoginError = useSelector((state) => state.auth.login.error);

  const submitRef = useRef(null);

  useEffect(() => {
    let timerId;
    if (!isLoginError && isLogin) {
      timerId = setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
    return () => clearTimeout(timerId);
  }, [isLoginError, isLogin]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleKeyDown = (e) => {
    if (e.keyCode.toString() === '13') {
      submitRef?.current?.click();
    }
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setIsShowPassword(!isShowPassword);
  };
  if (isShowPassword) {
    inputPasswordRef.current.setAttribute('type', 'text');
  } else {
    inputPasswordRef.current?.setAttribute('type', 'password');
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    await loginUser(user, dispatch, navigate);
  };

  return (
    <form className={cx('wrapper-login')} onSubmit={handleSubmitForm}>
      <div className={cx('back-btn')} onClick={onClick}>
        <BackIcon />
      </div>
      <div className={cx('title')}>Log in</div>
      <p className={cx('type')}>Email or username</p>
      <div className={cx('form-login')}>
        <div className={cx('email')}>
          <input type="text" placeholder="Email or username" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={cx('password')}>
          <input
            type="password"
            placeholder="Password"
            ref={inputPasswordRef}
            value={password}
            onChange={(e) => setPwd(e.target.value)}
          />
          <div className={cx('toggle-password')} onClick={handleShowPassword}>
            {isShowPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
          </div>
        </div>
      </div>
      <p className={cx('forgot')}>Forgot password</p>
      {(!email || !password )? (
        <button className={cx('login-btn')} disabled>
          Login
        </button>
      ) : (
        <button className={cx('login-btn')} ref={submitRef} type="submit">
          {!loginFetching ? (
            'Login'
          ) : (
            <FontAwesomeIcon className={cx('loading')} icon={faCircleNotch} />
          )}
        </button>
      )}
    </form>
  );
}
export default FormLogin;
