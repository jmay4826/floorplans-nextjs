import React from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import AddAPhoto from '@material-ui/icons/AddAPhoto';

import { SubmitComment } from './SubmitComment';
import CancelComment from './CancelComment';
import { GET_NEW_COMMENT } from '../graphql/queries';
import { Typography, Button } from '../node_modules/@material-ui/core';

class AddCommentDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      src: ''
    };
    this.handleImage = this.handleImage.bind(this);
  }
  handleImage(e) {
    const reader = new FileReader();
    const image = e.target.files[0];
    reader.addEventListener('load', () =>
      this.setState({
        src: reader.result,
        image
      }));
    reader.readAsDataURL(image);
  }
  render() {
    const { open, closeDialog } = this.props;
    return (
      <Dialog open={open} onClose={closeDialog} scroll="paper">
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent>
          <Query query={GET_NEW_COMMENT}>
            {({ data, client }) => (
              <div>
                <label
                  htmlFor="image-upload"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <div
                    style={{
                      transition: 'min-height 200ms',
                      backgroundImage: this.state.src
                        ? `url(${this.state.src})`
                        : 'gray',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      minHeight: this.state.src ? '40vh' : '0vh',
                      minWidth: '70vw'
                    }}
                  />

                  <Typography variant="display1">
                    <AddAPhoto fontSize="inherit" />
                  </Typography>

                  <Typography variant="button">
                    {this.state.image ? 'Change' : 'Add an '} Image
                  </Typography>
                  <input
                    id="image-upload"
                    style={{ display: 'none' }}
                    type="file"
                    accept="image/*"
                    onChange={this.handleImage}
                  />
                </label>
                {this.state.image && (
                  <Button
                    onClick={() => this.setState({ image: null, src: '' })}
                  >
                    Clear Image
                  </Button>
                )}

                <TextField
                  style={{ width: '100%' }}
                  label="Description"
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
        </DialogContent>
        <DialogActions>
          <CancelComment closeDialog={closeDialog} />
          <SubmitComment image={this.state.image} closeDialog={closeDialog} />
        </DialogActions>
      </Dialog>
    );
  }
}

AddCommentDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired
};

export default AddCommentDialog;
