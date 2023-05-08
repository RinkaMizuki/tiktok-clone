import Tippy from '@tippyjs/react/headless';
import 'tippy.js/animations/shift-away.css';

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import PropTypes from 'prop-types';

import { Wrapper as WrapperPopper } from '~/components/Popper';
import MenuItems from './MenuItems';
import Header from './Header';
import { useEffect, useState } from 'react';
import { UserAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function Menu({ children, items, hideOnClick = false, onChange = () => {} }) {
  //states
  const [history, setHistory] = useState([{ data: items }]);
  useEffect(() => {
    setHistory([{ data: items }]);
  }, [items]);

  const current = history[history.length - 1];

  //xử lí khi quay lại trang
  const handleBackMenu = () => {
    setHistory((prev) => prev.slice(0, history.length - 1));
  };
  //handle Logout User
  const { logOut } = UserAuth();

  const handleLogout = () => {
    logOut();
  };

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;

      return (
        <MenuItems
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else if (item.title === 'Log out') {
              handleLogout();
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };

  const renderResult = (attrs) => (
    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
      <WrapperPopper className={cx('menu-popper')}>
        {history.length > 1 && <Header title={current.title} onBack={handleBackMenu} />}
        <div className={cx('menu-body')}>{renderItems()}</div>
      </WrapperPopper>
    </div>
  );

  // Reset to first page
  const handleReset = () => {
    setHistory((prev) => prev.slice(0, 1));
  };

  return (
    <Tippy
      interactive
      delay={[0, 700]}
      offset={[12, 8]}
      hideOnClick={hideOnClick}
      placement="bottom-end"
      render={renderResult}
      onHide={handleReset}
    >
      {children}
    </Tippy>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  hideOnClick: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Menu;
