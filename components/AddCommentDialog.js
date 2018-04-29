import React from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import { SubmitComment } from './SubmitComment';
import CancelComment from './CancelComment';
import { GET_NEW_COMMENT } from '../graphql/queries';

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
    <Query query={GET_NEW_COMMENT}>
      {({ data, client }) => {
        console.log('addcommentdialog', data);
        return (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={e => console.log(e.target.files[0])}
            />

            <TextField
              style={{ width: '100%' }}
              hintText="Description"
              multiLine={true}
              onChange={e => {
                client.writeData({
                  data: {
                    newComment: {
                      ...data.newComment,
                      content: e.target.value
                    }
                  }
                });
              }}
            />
          </div>
        );
      }}
    </Query>
  </Dialog>
);

AddCommentDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default AddCommentDialog;
