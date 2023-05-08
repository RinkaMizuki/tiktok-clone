import './GlobalStyles.scss';
import PropTypes from 'prop-types';
import React from 'react';

function GlobalStyles({ children }) {
  //expected only one children
  return React.Children.only(children);
}
GlobalStyles.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalStyles;
