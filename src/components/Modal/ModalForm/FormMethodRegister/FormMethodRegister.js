import classNames from 'classnames/bind';
import styles from './FormMethodRegister.module.scss';
import { CaretDownSmall, Facebook, Google, KaKaoTalk, Line, Twitter, User } from '../../../Icons';
import React, { useState } from 'react';
import Button from '../../../Button';
import { UserAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);

const listMediaSocial = [
    {
        icon: <User />,
        desc: "Use phone or email",
    },
    {
        icon: <Facebook />,
        desc: "Coutinue with Facebook",
    },
    {
        icon: <Google />,
        desc: "Continue with Google",
    },
    {
        icon: <Twitter />,
        desc: "Continue with Twitter",
    },
    {
        icon: <Line />,
        desc: "Continue with Line",
    },
    {
        icon: <KaKaoTalk />,
        desc: "Continue with KaKaoTalk",
    },
]

function ModalFormMethodRegister({ onClick }) {

    const [isLoad, setIsLoad] = useState(false);
    const { googleSignIn } = UserAuth();
    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleShowMoreMethod = () => {
        setIsLoad(true);
    }

    const loadMethodRegister = isLoad ? listMediaSocial.length : 3;

    return (
        <div className={cx('inner')}>
            <div className={cx('title')}>
                Register for TikTok
            </div>
            <div className={cx('list')}>
                {listMediaSocial.slice(0, loadMethodRegister).map((media, index) => {
                    if (index === 2) {
                        return <React.Fragment key={index}>
                            <Button text className={cx('btn-form-login')} onClick={handleGoogleSignIn}>
                                <div className={cx('wrapper-icon')}>
                                    <span className={cx('icon')}>{media.icon}</span>
                                    <span>{media.desc}</span>
                                </div>
                            </Button>
                            <div className={cx('show-more')} onClick={handleShowMoreMethod}>
                                {isLoad ? null : <CaretDownSmall />}
                            </div>
                        </React.Fragment>
                    } else if (index === 0) {
                        return <React.Fragment key={index}>
                            <Button text className={cx('btn-form-login')} onClick={onClick}>
                                <div className={cx('wrapper-icon')}>
                                    <span className={cx('icon')}>{media.icon}</span>
                                    <span>{media.desc}</span>
                                </div>
                            </Button>
                        </React.Fragment>
                    }
                    return <React.Fragment key={index}>
                        <Button text className={cx('btn-form-login')}>
                            <div className={cx('wrapper-icon')}>
                                <span className={cx('icon')}>{media.icon}</span>
                                <span>{media.desc}</span>
                            </div>
                        </Button>
                    </React.Fragment>
                })}
            </div>
        </div>
    )
}

export default ModalFormMethodRegister;