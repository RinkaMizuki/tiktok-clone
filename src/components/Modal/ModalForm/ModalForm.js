
import classNames from 'classnames/bind';
import styles from './ModalForm.module.scss';
import { CancelIcon } from '../../Icons';
import React, { useState } from 'react';
import ModalFormMethodLogin from './FormMethodLogin';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import ModalFormMethodRegister from './FormMethodRegister/FormMethodRegister';

const cx = classNames.bind(styles);


function ModalForm({ onHideModal }) {
    const [isClosed, setIsClosed] = useState(false);
    const [isShowMethodLogin, setisShowMethodLogin] = useState(true);
    const [isShowFormLogin, setIsShowFormLogin] = useState(false);
    const [isShowFormRegister, setIsShowFormRegister] = useState(false);

    const handleCloseModal = () => {
        setIsClosed(true);
        setTimeout(() => {
            onHideModal();
        }, 220)
    }

    const handleShowMethodLogin = () => {
        setisShowMethodLogin(!isShowMethodLogin);
        setIsShowFormLogin(false);
    }
    const handleBackForm = () => {
        isShowMethodLogin ? setIsShowFormLogin(false) : setIsShowFormRegister(false);
    }

    const handleShowMethodRegister = () => {
        setisShowMethodLogin(!isShowMethodLogin);
    }
    const handleShowFormLogin = () => {
        setIsShowFormLogin(!isShowFormLogin);
    }
    const handleShowFormRegister = () => {
        setIsShowFormRegister(!isShowFormRegister);
    }

    return (
        <div className={cx('modal-mask')}>
            <div className={cx('wrapper', {
                'animationShow': !isClosed,
                'animationHide': isClosed,
            })}>
                <div className={cx('container')}>
                    {
                        isShowMethodLogin ? isShowFormLogin ? <FormLogin onClick={handleBackForm} /> : <ModalFormMethodLogin onClick={handleShowFormLogin} />
                            : isShowFormRegister ? <FormRegister onClick={handleBackForm} /> : <ModalFormMethodRegister onClick={handleShowFormRegister} />
                    }
                    {isShowFormRegister || isShowMethodLogin === false ? <div className={cx('agreement')}>
                        <p className={cx('atext')}>
                            By continuing, you agree to TikTok's <a href="https://www.tiktok.com/legal/page/row/terms-of-service/en" target='_blank' className={cx('alink')}>Terms of Service</a> and confirm that you have read TikTok's <a href="https://www.tiktok.com/legal/page/row/privacy-policy/en" target='_blank' className={cx('alink')}>Privacy Policy</a>
                        </p>
                    </div> : null}
                    <div className={cx('footer')}>
                        {isShowMethodLogin ? <div className={cx('notify')}>
                            Don't have an account?
                            <p onClick={handleShowMethodRegister}> Sign up</p>
                        </div> :
                            <div className={cx('notify')}>
                                Already have an account?
                                <p onClick={handleShowMethodLogin}> Log in </p>
                            </div>
                        }
                    </div>
                </div>
                <div className={cx('close-btn')} onClick={handleCloseModal}>
                    <CancelIcon className={cx('cancel-icon')} />
                </div>
            </div>
        </div>
    )
}
export default ModalForm;