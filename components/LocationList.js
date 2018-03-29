import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";

import FlatButton from "material-ui/FlatButton";

const query = gql`
  query {
    locations: getUser {
      locations {
        id
        name
      }
    }
  }
`;

const LocationList = ({ locations }) => {
  return (
    <div>
      {locations.map(location => (
        <Link href={`/location?id=${location.id}`}>
          <FlatButton style={{ margin: "5px" }}>
            {`${location.name}
            (${location.id})`}
          </FlatButton>
        </Link>
      ))}
    </div>
  );
};

// export default TestComponent;
export default graphql(query, {
  props: ({ data }) => {
    console.log(data);
    return {
      locations: data.locations ? data.locations.locations : []
    };
  }
})(LocationList);
