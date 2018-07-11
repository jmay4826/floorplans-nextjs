import React from 'react';
import PropTypes from 'prop-types';
import { Mutation, Query } from 'react-apollo';

import Button from '@material-ui/core/Button';

import { ADD_COMMENT } from '../graphql/mutations';
import { GET_LOCATION, GET_NEW_COMMENT } from '../graphql/queries';

const optimisticResponse = (newComment, image) => ({
  __typename: 'Mutation',
  addComment: {
    ...newComment,
    id: -1,
    complete: false,
    author: 'none',
    image: '',
    updated_at: null,
    created_at: new Date().toDateString(),
    replies: [],
    __typename: 'Comment'
  }
});

const update = (cache, { data: { addComment } }, { location }) => {
  const { getLocation } = cache.readQuery({
    query: GET_LOCATION,
    variables: { id: location }
  });

  console.log(getLocation);
  console.log(addComment);
  cache.writeQuery({
    query: GET_LOCATION,
    variables: { id: location },
    data: {
      getLocation: {
        ...getLocation,
        comments: {
          ...getLocation.comments,
          incomplete: [addComment, ...getLocation.comments.incomplete]
        }
      }
    }
  });
};

const SubmitComment = ({ closeDialog, image }) => (
  <Query query={GET_NEW_COMMENT}>
    {({ client, data: { newComment } }) => {
      console.log(newComment);
      return (
        <Mutation
          mutation={ADD_COMMENT}
          optimisticResponse={optimisticResponse(newComment, image)}
          update={(cache, response) =>
            update(cache, response, newComment, image)
          }
        >
          {(submitComment, { error, loading }) => {
            if (error) return <p>Error</p>;
            if (loading) return <p>Loading</p>;
            return (
              <Button
                primary
                onClick={() => {
                  submitComment({
                    variables: {
                      input: {
                        ...newComment,
                        image,
                        id: undefined,
                        __typename: undefined
                      }
                    }
                  });
                  client.writeData({
                    data: {
                      newComment: {
                        id: newComment.id,
                        content: '',
                        x: 0,
                        y: 0,
                        location: '',
                        __typename: 'NewComment'
                      }
                    }
                  });
                  closeDialog();
                }}
              >
                Submit
              </Button>
            );
          }}
        </Mutation>
      );
    }}
  </Query>
);

SubmitComment.propTypes = {
  closeDialog: PropTypes.func.isRequired
};

export { SubmitComment };
