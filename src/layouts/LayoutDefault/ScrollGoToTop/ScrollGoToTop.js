import classNames from 'classnames/bind';
import styles from './ScrollGoToTop.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForwardStep } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function ScrollTop({}, ref) {
  const { btnRef, contentRef } = ref;
  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    contentRef.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 10 pixels
    const content = contentRef.current;
    const toggleVisibility = () => {
      if (content.scrollTop > 10) {
        btnRef.current.classList.remove(cx('hide'));
        btnRef.current.classList.add(cx('show'));

        // btnRef.current.style.transform = 'none';
        // btnRef.current.style.transition = 'all 400ms cubic-bezier(0.65, 0, 0.35, 1) 0s';
      } else {
        btnRef.current.classList.remove(cx('show'));
        btnRef.current.classList.add(cx('hide'));

        // btnRef.current.style.transform = 'translateY(40px)';
        // btnRef.current.style.transition = 'all 400ms cubic-bezier(0.65, 0, 0.35, 1) 0s';
      }
    };

    content.addEventListener('scroll', toggleVisibility);

    return () => content.removeEventListener('scroll', toggleVisibility);
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
