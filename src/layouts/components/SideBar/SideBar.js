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

const cx = classNames.bind(styles);

function SideBar() {
  const { user } = UserAuth();

  return (
    <aside className={cx('wrapper')}>
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

      {!user ? (
        <div className={cx('login-to-follow')}>
          <p className={cx('desc')}>Log in to follow creators, like videos, and view comments. </p>
          <Button outline large className={cx('login-btn')}>
            Log in
          </Button>
        </div>
      ) : (
        <></>
      )}

      <SuggestAccounts label="Suggested accounts" see="See all" />
      {user && <SuggestAccounts label="Following accounts" see="See more" />}
      <Discover />
      <AboutInfo />
    </aside>
  );
}

export default SideBar;
