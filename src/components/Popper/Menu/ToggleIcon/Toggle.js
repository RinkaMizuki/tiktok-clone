import classNames from 'classnames/bind';
import styles from './Toggle.module.scss';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

function Toggle() {
  const setDark = () => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    inputRef.current.setAttribute('checked', 'checked');
  };
  const setLight = () => {
    localStorage.setItem('theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
  };

  const inputRef = useRef();

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme === 'dark') {
      setDark();
    } else {
      setLight();
    }
  }, []);
  const toggleTheme = (e) => {
    if (e.target.checked) {
      setDark();
    } else {
      setLight();
    }
  };

  return (
    <>
      <input ref={inputRef} type="checkbox" id="switch" className={cx('switch-input')} onInput={toggleTheme} />
      <label htmlFor="switch" className={cx('switch')}></label>
    </>
  );
}

export default Toggle;
