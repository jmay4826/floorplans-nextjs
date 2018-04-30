import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

const CancelAction = ({ closeDialog }) => (
  <FlatButton onClick={closeDialog}>Cancel</FlatButton>
);

CancelAction.propTypes = {
  closeDialog: PropTypes.func.isRequired
};

export default CancelAction;
