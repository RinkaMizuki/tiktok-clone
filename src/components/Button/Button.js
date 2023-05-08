import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  children,
  onClick,
  text = false,
  small = false,
  large = false,
  rounded = false,
  outline,
  primary,
  disable,
  className,
  iconUpload,
  iconRightSignIn,
  iconLeftSignIn,
  toggle,
  refBtn,
  key,
  ...passProps
}) {
  let Cpn = 'button';

  const props = {
    onClick,
    //Những prop k lường trước được khi nào nó có
    ...passProps,
  };


  if (to) {
    props.to = to;
    Cpn = Link;
  } else if (href) {
    props.href = href;
    Cpn = 'a';
  } else if (disable) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }

  const classes = cx('wrapper', {
    primary,
    outline,
    small,
    large,
    text,
    disable,
    rounded,
    [className]: className,
  });

  return (
    <Cpn className={classes} {...props} ref={refBtn} key={key}>
      {iconUpload && iconUpload}
      {iconLeftSignIn && <span className={cx('icon')}>{iconLeftSignIn}</span>}
      <span className={cx('title')}>{children}</span>
      {toggle}
      {iconRightSignIn && <span className={cx('icon')}>{iconRightSignIn}</span>}
    </Cpn>
  );
}

//check các props của một component
Button.propTypes = {
  // onClick: PropTypes.func,
  to: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  rounded: PropTypes.bool,
  outline: PropTypes.bool,
  primary: PropTypes.bool,
  disable: PropTypes.bool,
  toggle: PropTypes.node,
  iconUpload: PropTypes.node,
  iconRightSignIn: PropTypes.node,
  iconLeftSignIn: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default Button;
