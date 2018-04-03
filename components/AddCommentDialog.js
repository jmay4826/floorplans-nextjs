import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import SubmitComment from './SubmitComment';
import CancelComment from './CancelComment';

const AddCommentDialog = ({ open, handleClose }) => (
  <Dialog
    title="Add Comment"
    open={open}
    onRequestClose={handleClose}
    autoScrollBodyContent={true}
    actions={[
      <CancelComment handleClose={handleClose} />,
      <SubmitComment handleClose={handleClose} />
    ]}
  >
    <input type="file" />
    <TextField
      style={{ width: '100%' }}
      hintText="Description"
      multiLine={true}
      onChange={e => console.log('This will be a mutation', e)}
    />
  </Dialog>
);

AddCommentDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default AddCommentDialog;
