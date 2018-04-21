import React from 'react';
import PropTypes from 'prop-types';

import { Mutation, ApolloConsumer, Query } from 'react-apollo';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import SubmitComment from './SubmitComment';
import CancelComment from './CancelComment';
import { NEW_COMMENT } from '../graphql/mutations';
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
    <input type="file" />
    <Query query={GET_NEW_COMMENT}>
      {({ data, client }) => {
        console.log(data);
        return (
          <div>
            <p>Existing: {JSON.stringify(data)}</p>
            <TextField
              style={{ width: '100%' }}
              hintText="Description"
              multiLine={true}
              onChange={e => {
                client.writeData({
                  data: {
                    newComment: {
                      id: `NewComment:${data.id || ''}`,
                      content: e.target.value,
                      __typename: 'NewComment'
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
