import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './TippyShare.module.scss';
import {
  CaretDownSmall,
  Email,
  Embed,
  Facebook,
  Line,
  Linked,
  LinkedIn,
  Pinterest,
  Send,
  Telegram,
  Twitter,
  WhatsApp,
} from '~/components/Icons';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);
export const listMediaSocial = [
  {
    icon: <Embed />,
    desc: 'Embed',
  },
  {
    icon: <Send />,
    desc: 'Send to friends',
  },
  {
    icon: <Facebook />,
    desc: 'Share to Facebook',
  },
  {
    icon: <WhatsApp />,
    desc: 'Share to WhatsApp',
  },
  {
    icon: <Linked />,
    desc: 'Copy link',
  },
  {
    icon: <Twitter />,
    desc: 'Share to Twitter',
  },
  {
    icon: <LinkedIn />,
    desc: 'Share to LinkedIn',
  },
  {
    icon: <Email />,
    desc: 'Share to Email',
  },
  {
    icon: <Telegram />,
    desc: 'Share to Telegram',
  },
  {
    icon: <Line />,
    desc: 'Share to Line',
  },
  {
    icon: <Pinterest />,
    desc: 'Share to Pinterest',
  },
];

const TippyShare = ({ children, delay, interactive = false, zIndex, placement, className }) => {
  const [itemList, setItemList] = useState(false);
  const loadListItem = itemList ? listMediaSocial.length : 5;
  const caretRef = useRef();
  const handleHideTippy = () => {
    setItemList(false);
  };
  const handleShowItem = () => {
    setItemList(true);
  };
  useEffect(() => {
    if (loadListItem > 5) {
      caretRef.current?.classList.add('hide-caret');
    } else {
      caretRef.current?.classList.remove('hide-caret');
    }
  }, [itemList, loadListItem]);

  return (
    <Tippy
      delay={delay}
      interactive={interactive}
      zIndex={zIndex}
      placement={placement}
      popperOptions={{ modifiers: [{ name: 'flip', enabled: false }] }}
      onHide={handleHideTippy}
      render={(attrs) => (
        <div {...attrs} tabIndex="-1" className={cx('tippy-container', className)}>
          <div className={cx('share-wrapper')}>
            {listMediaSocial.slice(0, loadListItem).map((item, index) => (
              <button key={index} className={cx('item-wrapper')}>
                {item.icon}
                <span className={cx('item-text')}>{item.desc}</span>
              </button>
            ))}
            <button
              ref={caretRef}
              className={cx('item-wrapper', {
                'item-caret-down': 'item-caret-down',
              })}
              onClick={handleShowItem}
            >
              {itemList ? null : <CaretDownSmall />}
            </button>
          </div>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
};

export default TippyShare;
