import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

const CancelAction = props => (
  <FlatButton onClick={props.handleClose}>Cancel</FlatButton>
);

CancelAction.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default CancelAction;
