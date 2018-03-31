import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";

import FlatButton from "material-ui/FlatButton";

const query = gql`
  query {
    getUser {
      locations {
        id
        name
      }
    }
  }
`;

const LocationList = () => {
  return (
    <Query query={query}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading</p>;
        if (error) return <p>Error</p>;
        console.log(data);
        const locations = data.getUser.locations;
        return (
          <div>
            {locations.map(location => (
              <Link
                key={location.id}
                prefetch
                href={`/location?id=${location.id}`}
              >
                <FlatButton style={{ margin: "5px" }}>
                  {`${location.name}
            (${location.id})`}
                </FlatButton>
              </Link>
            ))}
          </div>
        );
      }}
    </Query>
  );
};

// export default TestComponent;
export default LocationList;
