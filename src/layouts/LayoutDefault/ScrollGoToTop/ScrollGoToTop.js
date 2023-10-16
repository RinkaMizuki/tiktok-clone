import classNames from 'classnames/bind';
import styles from './ScrollGoToTop.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForwardStep } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect } from 'react';
import { VideoContext } from '~/context/VideoContext';

const cx = classNames.bind(styles);

function ScrollTop({}, ref) {
  const { setIsScrollToTop } = useContext(VideoContext);

  const { btnRef } = ref;
  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    setIsScrollToTop(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 35 pixels
    const toggleVisibility = () => {
      if (window.scrollY > 35) {
        btnRef.current.classList.remove(cx('hide'));
        btnRef.current.classList.add(cx('show'));
      } else {
        setIsScrollToTop(false);
        btnRef.current.classList.remove(cx('show'));
        btnRef.current.classList.add(cx('hide'));
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {
        <button className={cx('btn-step')} onClick={scrollToTop}>
          <FontAwesomeIcon icon={faForwardStep} className={cx('iconGoToTop')} />
        </button>
      }
    </>
  );
}

export default React.forwardRef(ScrollTop);
