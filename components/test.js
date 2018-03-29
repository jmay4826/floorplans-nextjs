import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const query = gql`
  query {
    user: getUser {
      username
      type
      name
    }
  }
`;

const TestComponent = props => {
  console.log("test", props);
  return <div>I'm here</div>;
};

// export default TestComponent;
export default graphql(query)(TestComponent);
