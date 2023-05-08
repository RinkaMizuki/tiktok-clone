import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ to, title, icon, activeIcon }) {
  return (
    /*
        trong react router dom V6 có hỗ trợ function trong className
        khi callback được gọi thì thằng NavLink trả về cho 1 NavData(Obj) có key isActive dùng để check active
    */
    <NavLink to={to} className={(nav) => cx('menu-item', { active: nav.isActive })}>
      <span className={cx('icon')}>{icon}</span>
      <span className={cx('active-icon')}>{activeIcon}</span>
      <span className={cx('title')}>{title}</span>
    </NavLink>
  );
}

MenuItem.propTypes = {
  to: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.node.isRequired,
  activeIcon: PropTypes.node.isRequired,
};

export default MenuItem;
