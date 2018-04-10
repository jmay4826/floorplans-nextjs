import React from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import SubmitComment from './SubmitComment';
import CancelComment from './CancelComment';
import { NEW_COMMENT } from '../graphql/mutations';

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
    <Mutation mutation={NEW_COMMENT}>
      {newComment => (
        <TextField
          style={{ width: '100%' }}
          hintText="Description"
          multiLine={true}
          onChange={e =>
            newComment({ variables: { input: { content: e.target.value } } })
          }
        />
      )}
    </Mutation>
  </Dialog>
);

AddCommentDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default AddCommentDialog;
