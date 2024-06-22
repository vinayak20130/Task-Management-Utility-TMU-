import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const CustomButton = ({ onClick, children, className }) => (
  <Button type="primary" onClick={onClick} className={className}>
    {children}
  </Button>
);

CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CustomButton.defaultProps = {
  className: 'add=button',
};

export default CustomButton;
