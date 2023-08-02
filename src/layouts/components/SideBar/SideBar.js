import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import Menu, { MenuItem } from './Menu';
import * as Icons from '~/components/Icons';
import config from '~/config';
import Button from '~/components/Button/Button';
import SuggestAccounts from '~/components/SuggestAccounts';
import Discover from '~/components/Discover/Discover';
import AboutInfo from '~/components/AboutInfo/AboutInfo';
import { UserAuth } from '~/context/AuthContext';
import { useLocalStorage } from '~/hooks';
import { useContext } from 'react';
import { ModuleContext } from '~/context/ModalContext';

import FollowAccounts from '~/components/FollowAccounts/FollowAccouts';
import { useRef } from 'react';

const cx = classNames.bind(styles);

function SideBar() {
  const { user } = UserAuth();
  const { getLocalStorage } = useLocalStorage();
  const { auth } = getLocalStorage('persist:root');
  const data = auth && JSON.parse(auth);
  const sideBarRef = useRef(null);
  const { handleShowModalForm } = useContext(ModuleContext);
  return (
    <aside className={cx('wrapper')} ref={sideBarRef}>
      <Menu>
        <MenuItem
          to={config.routes.home}
          title="For You"
          icon={<Icons.HomeIcon />}
          activeIcon={<Icons.HomeActiveIcon />}
        />
        <MenuItem
          to={config.routes.following}
          title="Following"
          icon={<Icons.UserGroupIcon />}
          activeIcon={<Icons.UserGroupActiveIcon />}
        />
        <MenuItem
          to={config.routes.live}
          title="LIVE"
          icon={<Icons.LiveIcon />}
          activeIcon={<Icons.LiveActiveIcon />}
        />
      </Menu>

      {!user && !data?.login?.isLogin ? (
        <div className={cx('login-to-follow')}>
          <p className={cx('desc')}>Log in to follow creators, like videos, and view comments. </p>
          <Button outline large className={cx('login-btn')} onClick={handleShowModalForm}>
            Log in
          </Button>
        </div>
      ) : (
        <></>
      )}

      <SuggestAccounts labelSuggested="Suggested accounts" seeAll="See all" sideBarRef={sideBarRef} />
      {(user || data?.login?.isLogin) && (
        <FollowAccounts labelFollowed="Following accounts" seeMore="See more" sideBarRef={sideBarRef} />
      )}
      <Discover />
      <AboutInfo />
    </aside>
  );
}

export default SideBar;
