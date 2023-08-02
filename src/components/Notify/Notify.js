import React from 'react';
import classNames from 'classnames';
import styles from './Notify.module.scss';

const cx = classNames.bind(styles);

const Notify = ({ message = 'Login success' }) => {
  return (
    <div className={cx('wrapper')}>
      <span>{message}</span>
    </div>
  );
};

export default Notify;
