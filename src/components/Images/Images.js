import image from '~/assets/images';
import styles from './Images.module.scss';
import classNames from 'classnames';
import { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

const Image = forwardRef(({ src, alt, className, fallBack: customFallback = image.noImage, ...props }, ref) => {
  const [fallBack, setFallBack] = useState('');
  const handleErrorImg = () => {
    setFallBack(customFallback);
  };

  return (
    <img
      className={classNames(styles.wrapper, className)}
      ref={ref}
      src={fallBack || src}
      alt={alt}
      {...props}
      onError={handleErrorImg}
    />
  );
});

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  fallBack: PropTypes.string,
};

export default Image;
