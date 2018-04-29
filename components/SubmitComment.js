import React from 'react';
import PropTypes from 'prop-types';
import { Mutation, Query } from 'react-apollo';

import FlatButton from 'material-ui/FlatButton';

import { ADD_COMMENT } from '../graphql/mutations';
import { GET_LOCATION, GET_NEW_COMMENT } from '../graphql/queries';

const optimisticResponse = newComment => ({
  __typename: 'Mutation',
  addComment: {
    ...newComment,
    id: -1,
    complete: false,
    author: 'none',
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

  cache.writeQuery({
    query: GET_LOCATION,
    variables: { id: location },
    data: {
      getLocation: {
        ...getLocation,
        comments: [addComment, ...getLocation.comments]
      }
    }
  });
};

const SubmitComment = props => (
  <Query query={GET_NEW_COMMENT}>
    {({ client, data: { newComment } }) => (
      <Mutation
        mutation={ADD_COMMENT}
        optimisticResponse={optimisticResponse(newComment)}
        update={(cache, response) => update(cache, response, newComment)}
      >
        {(submitComment, { error, loading, ...rest }) => {
          console.log(rest);
          if (error) return <p>Error</p>;
          if (loading) return <p>Loading</p>;
          return (
            <FlatButton
              primary
              onClick={() => {
                submitComment({
                  variables: {
                    input: {
                      ...newComment,
                      open: undefined,
                      id: undefined,
                      __typename: undefined
                    }
                  }
                });
                client.writeData({
                  data: {
                    newComment: {
                      id: newComment.id,
                      __typename: 'NewComment',
                      open: false
                    }
                  }
                });
              }}
            >
              Submit
            </FlatButton>
          );
        }}
      </Mutation>
    )}
  </Query>
);

SubmitComment.propTypes = {
  handleClose: PropTypes.func
};

export { SubmitComment };
