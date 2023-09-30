import { UserAuth } from '~/context/AuthContext';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignIn,
  faGlobe,
  faCircleQuestion,
  faKeyboard,
  faMoon,
  faUser,
  faCoins,
  faGear,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import image from '~/assets/images';
import Button from '~/components/Button';
import { Menu } from '~/components/Popper/Menu';
import * as Icons from '~/components/Icons';
import Image from '~/components/Images';
import Search from '../Search';
import { Link } from 'react-router-dom';
import config from '~/config';
import { useContext } from 'react';
import { ModalContext } from '~/context/ModalContext';
import { useLocalStorage } from '~/hooks';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);
//config menu items
const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faGlobe} />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          type: 'language',
          code: 'eng',
          title: 'English',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
        {
          type: 'language',
          code: 'eng',
          title: 'English',
        },
        {
          type: 'language',
          code: 'eng',
          title: 'English',
        },
        {
          type: 'language',
          code: 'eng',
          title: 'English',
        },
        {
          type: 'language',
          code: 'eng',
          title: 'English',
        },
        {
          type: 'language',
          code: 'eng',
          title: 'English',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keybroad shortcuts',
  },
  {
    icon: <FontAwesomeIcon icon={faMoon} />,
    title: 'Dark mode',
    toggle: true,
  },
];

function Header() {
  const nickname = useSelector((state) => state.auth.login?.currentUser?.nickname);
  const MENU_USERS = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profiles',
      to: `/@${nickname}`,
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: 'Get Coins',
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Settings',
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: 'Log out',
      separate: true,
    },
  ];

  const handleChange = (MenuItems) => {
    switch (MenuItems.type) {
      case 'language':
        console.log(MenuItems);
        break;
      default:
    }
  };
  //set state
  const { user } = UserAuth();
  const { getLocalStorage } = useLocalStorage();
  const { handleShowModalForm } = useContext(ModalContext);
  const navigate = useNavigate();

  const { auth } = getLocalStorage('persist:root');
  const data = auth && JSON.parse(auth);
  const props = {};
  if (user || data?.login?.isLogin) {
    props.to = '/upload';
  }
  const handleUpload = () => {
    if (user || data?.login?.isLogin) {
      navigate('/upload');
    } else {
      handleShowModalForm();
    }
  };

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to={config.routes.home} className={cx('logo-link')}>
          <img src={image.logoLight} alt="Tiktok" className={cx('nav-logo')} />
        </Link>

        {/*Tippy search*/}
        <Search />

        <div className={cx('action', user || (data?.login?.isLogin && 'gap'))}>
          <Button {...props} text iconUpload={<Icons.UploadIcon />} onClick={handleUpload}>
            Upload
          </Button>
          {user || data?.login?.isLogin ? (
            <>
              <Tippy zIndex={99999} content="Messages" delay={[0, 100]} animation="scale">
                <button className={cx('user-btn')}>
                  <Icons.PaperPlane className={cx('btn-dark')} />
                </button>
              </Tippy>
              <Tippy zIndex={99999} content="Inbox" delay={[0, 100]} animation="scale">
                <button className={cx('user-btn')}>
                  <Icons.Messages className={cx('btn-dark')} />
                  <span className={cx('badge')}>1</span>
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button onClick={handleShowModalForm} primary iconLeftSignIn={<FontAwesomeIcon icon={faSignIn} />}>
                Log in
              </Button>
              {/*Tippy more items*/}
            </>
          )}
          {user || data?.login?.isLogin ? (
            <Menu items={MENU_USERS} onChange={handleChange}>
              <Image
                className={cx('user-avatar')}
                src={user?.photoURL || data?.login?.currentUser?.avatar}
                alt={user?.displayName}
              />
            </Menu>
          ) : (
            <Menu items={MENU_ITEMS} onChange={handleChange}>
              <button className={cx('more-icon')}>
                <Icons.MenuIcon />
              </button>
            </Menu>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
