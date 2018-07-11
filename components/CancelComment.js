import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const CancelAction = ({ closeDialog }) => (
  <Button onClick={closeDialog}>Cancel</Button>
);

CancelAction.propTypes = {
  closeDialog: PropTypes.func.isRequired
};

export default CancelAction;
