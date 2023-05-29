import classNames from "classnames/bind";
import styles from "./FormRegister.module.scss";
import { BackIcon, HideIcon, ShowIcon } from "~/components/Icons";
import { useRef, useState } from "react";


const cx = classNames.bind(styles);

function FormRegister({ onClick }) {

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
        <form className={cx('wrapper-register')}>
            <div className={cx('back-btn')} onClick={onClick}>
                <BackIcon />
            </div>
            <div className={cx('title')}>
                Register
            </div>
            <p className={cx('type')}>
                Use phone or email
            </p>
            <div className={cx('form-register')}>
                <div className={cx('email')}>
                    <input type="text" placeholder="Use phone or email" />
                </div>
                <div className={cx('password')}>
                    <input type="password" placeholder="Password" ref={inputPasswordRef} />

                    <button className={cx('toggle-password')} onClick={handleShowPassword}>
                        {isShowPassword ? <ShowIcon /> : <HideIcon />}
                    </button>
                </div>
            </div>
            <button disabled className={cx('register-btn')}>Register</button>
        </form>
    )
}

export default FormRegister;