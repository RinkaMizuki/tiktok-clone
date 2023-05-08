import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Button from '~/components/Button';
import Toggle from './ToggleIcon/Toggle';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function MenuItems({ data, onClick }) {
  return (
    <Button
      toggle={data.toggle && <Toggle />}
      className={cx('menu-item', {
        separate: data.separate,
      })}
      iconLeftSignIn={data.icon}
      to={data.to}
      onClick={onClick}
    >
      {data.title}
    </Button>
  );
}
MenuItems.propTypes = {
  data: PropTypes.object,
};

export default MenuItems;
