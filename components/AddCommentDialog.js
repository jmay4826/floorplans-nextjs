import React from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

import { SubmitComment } from './SubmitComment';
import CancelComment from './CancelComment';
import { GET_NEW_COMMENT } from '../graphql/queries';

class AddCommentDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }
  render() {
    const { open, closeDialog } = this.props;
    return (
      <Dialog
        title="Add Comment"
        open={open}
        onRequestClose={closeDialog}
        autoScrollBodyContent={true}
        actions={[
          <CancelComment closeDialog={closeDialog} />,
          <SubmitComment image={this.state.image} closeDialog={closeDialog} />
        ]}
      >
        <Query query={GET_NEW_COMMENT}>
          {({ data, client }) => (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={e => this.setState({ image: e.target.files[0] })}
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
          )}
        </Query>
      </Dialog>
    );
  }
}

AddCommentDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired
};

export default AddCommentDialog;
