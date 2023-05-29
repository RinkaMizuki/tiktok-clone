import classNames from "classnames/bind";
import styles from "./FormLogin.module.scss";
import { BackIcon, HideIcon, ShowIcon } from "~/components/Icons";
import { useRef, useState } from "react";


const cx = classNames.bind(styles);

function FormLogin({ onClick }) {

    const [isShowPassword, setIsShowPassword] = useState(false);

    const inputPasswordRef = useRef();

    const handleShowPassword = (e) => {
        e.preventDefault();
        setIsShowPassword(!isShowPassword);
    }
    if (isShowPassword) {
        inputPasswordRef.current.setAttribute('type', 'text');
    } else {
        inputPasswordRef.current?.setAttribute('type', 'password');
    }

    return (
        <form className={cx('wrapper-login')}>
            <div className={cx('back-btn')} onClick={onClick}>
                <BackIcon />
            </div>
            <div className={cx('title')}>
                Log in
            </div>
            <p className={cx('type')}>
                Email or username
            </p>
            <div className={cx('form-login')}>
                <div className={cx('email')}>
                    <input type="text" placeholder="Email or username" />
                </div>
                <div className={cx('password')}>
                    <input type="password" placeholder="Password" ref={inputPasswordRef} />

                    <button className={cx('toggle-password')} onClick={handleShowPassword}>
                        {isShowPassword ? <ShowIcon /> : <HideIcon />}
                    </button>
                </div>
            </div>
            <p className={cx('forgot')}>
                Forgot password
            </p>
            <button disabled className={cx('login-btn')}>Log in</button>
        </form>
    )

}
export default FormLogin;