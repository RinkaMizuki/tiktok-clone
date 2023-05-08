import classNames from 'classnames/bind';
import styles from './Toggle.module.scss';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

function Toggle() {

  const setDark = () => {
    // console.log("dark");
     localStorage.setItem("theme","dark");
     document.documentElement.setAttribute("data-theme","dark");
      inputRef.current.setAttribute("checked","checked");
  }
  const setLight = () => {
    // console.log("light");
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme","light");
    // inputRef.current.setAttribute("checked","false");
  }

  const inputRef = useRef();

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if(localTheme === "dark") {
      setDark();
    }
    else {
      setLight();
    }
  },[])
  const toggleTheme = (e) => {
    if(e.target.checked) {
      setDark();
    }else {
      setLight();
    }
  }

  return (
    <>
      <input ref={inputRef} type="checkbox" id="switch" className={cx('switch-input')} onInput={(e) => {toggleTheme(e)}}/>
      <label htmlFor="switch" className={cx('switch')}></label>
    </>
  );
}

export default Toggle;
