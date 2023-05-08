import classNames from 'classnames/bind';
import styles from './LayoutDefault.module.scss';
import Header from '~/layouts/components/Header';
import SideBar from '~/layouts/components/SideBar';
import PropTypes from 'prop-types';
import Button from '~/components/Button/Button';
import ScrollTop from './ScrollGoToTop';
import { useRef, useState } from 'react';
import { CancelIcon, PhoneIcon, TvIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {

  // const [show, setShow] = useState(false);

  const btnRef = useRef();
  const contentRef = useRef();
  const divRef = useRef();
  const btnGetRef = useRef();

  const handleClickGetApp = () => {
    divRef.current.classList.remove(cx('hide'));
    divRef.current.classList.add(cx('show'));
    btnGetRef.current.classList.remove(cx('show'));
    btnGetRef.current.classList.add(cx('hide'));
  }
  const handleHideGetApp = () => {
    divRef.current.classList.remove(cx('show'));
    divRef.current.classList.add(cx('hide'));
    btnGetRef.current.classList.remove(cx('hide'));
    btnGetRef.current.classList.add(cx('show'));
  }

  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        <SideBar />
        <div className={cx('content')} ref={contentRef}>
          {children}
        </div>
        <div ref={btnRef} className={cx('container-button')}>
          <Button refBtn={btnGetRef} rounded className={cx('btn-get-app')} onClick={handleClickGetApp}>
            Get app
          </Button>
          <div className={cx('expand-container', {
            'hide': 'hide',
          })} ref={divRef}>
            <div className={cx('xmark-wrapper')} onClick={handleHideGetApp}>
              <CancelIcon className={cx('btn-dark')} />
            </div>
            <div className={cx('expand-wrapper')}>
              <div className={cx('item-container')}>
                <TvIcon className={cx('btn-dark')} />
                <span className={cx('btn-dark', {
                  'span-text': 'span-text',
                })}>Get TikTok for desktop</span>
              </div>
              <div className={cx('split')}></div>
              <div className={cx('item-container')}>
                <PhoneIcon className={cx('btn-dark')} />
                <span className={cx('btn-dark', {
                  'span-text': 'span-text',
                })}>Get TikTok App</span>
              </div>
            </div>
          </div>
          <ScrollTop ref={{ btnRef, contentRef }} />
        </div>
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
