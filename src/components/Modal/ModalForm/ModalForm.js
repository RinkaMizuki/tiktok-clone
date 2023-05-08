
import classNames from 'classnames/bind';
import styles from './ModalForm.module.scss';
import { Apple, CancelIcon, Facebook, Google, Instagram, KaKaoTalk, Line, QR, Twitter, User } from '../../Icons';
import Button from '../../Button';
import { UserAuth } from '~/context/AuthContext';


const cx = classNames.bind(styles);

const listMediaSocial = [
    {
        icon: <QR />,
        desc: "Use QR code",
    },
    {
        icon: <User />,
        desc: "Use phone / email / username",
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
    {
        icon: <Apple />,
        desc: "Continue with Apple",
    },
    {
        icon: <Instagram />,
        desc: "Continue with Instagram",
    },
]

function ModalForm({ onHideModal }) {

    const { googleSignIn } = UserAuth();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={cx('modal-mask')}>
            <div className={cx('wrapper', {
                animationShow: 'animationShow',
            })}>
                <div className={cx('container')}>
                    <div className={cx('inner')}>
                        <div className={cx('title')}>
                            Log in to TikTok
                        </div>
                        <div className={cx('list')}>
                            {listMediaSocial.map((media, index) => {
                                return index === 3 ? <Button text key={index} className={cx('btn-form-login')} onClick={handleGoogleSignIn}>
                                    <div className={cx('wrapper-icon')}>
                                        <span className={cx('icon')}>{media.icon}</span>
                                        <span>{media.desc}</span>
                                    </div>
                                </Button> : <Button text key={index} className={cx('btn-form-login')}>
                                    <div className={cx('wrapper-icon')}>
                                        <span className={cx('icon')}>{media.icon}</span>
                                        <span>{media.desc}</span>
                                    </div>
                                </Button>
                            })}
                        </div>
                    </div>
                    <div className={cx('footer')}>
                        <div className={cx('notify')}>
                            Don't have an account?
                            <p> Sign up</p>
                        </div>
                    </div>
                </div>
                <div className={cx('close-btn')} onClick={onHideModal}>
                    <CancelIcon className={cx('cancel-icon')} />
                </div>
            </div>
        </div>
    )
}
export default ModalForm;