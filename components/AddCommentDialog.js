import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import { GET_LOCATION } from "../pages/location";

const mutation = gql`
  mutation addComment($input: NewComment!) {
    addComment(input: $input) {
      id
      content
      author
      x
      y
      complete
      created_at
      updated_at
      replies {
        id
        content
      }
    }
  }
`;

const SubmitAction = props => (
  <Mutation
    mutation={mutation}
    update={(cache, response) => {
      const cached = cache.readQuery({
        query: GET_LOCATION,
        variables: { id: props.id }
      });
      console.log(props);
      cache.writeQuery({
        query: GET_LOCATION,
        variables: { id: props.id },
        data: {
          getLocation: {
            ...cached.getLocation,
            comments: [response.data.addComment, ...cached.getLocation.comments]
          }
        }
      });
    }}
  >
    {(mutate, { loading, error }) => {
      console.log(loading, error);
      return (
        <FlatButton
          primary
          onClick={() => {
            mutate({
              variables: { input: props.input }
            });
            props.handleClose();
          }}
        >
          Submit
        </FlatButton>
      );
    }}
  </Mutation>
);

const CancelAction = props => (
  <FlatButton onClick={props.handleClose}>Cancel</FlatButton>
);

class AddCommentDialog extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      x: props.x,
      y: props.y,
      content: "",
      location: props.id
    };
  }

  static propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleSubmit: PropTypes.func
  };
  render() {
    return (
      <Dialog
        title="Add Comment"
        open={this.props.open}
        onRequestClose={this.props.handleClose}
        autoScrollBodyContent={true}
        actions={[
          <CancelAction {...this.props} />,
          <SubmitAction {...this.props} input={this.state} />
        ]}
      >
        <input type="file" />
        <TextField
          style={{ width: "100%" }}
          hintText={"Description"}
          multiLine={true}
          onChange={e => this.setState({ content: e.target.value })}
        />
      </Dialog>
    );
  }
}

export default AddCommentDialog;
