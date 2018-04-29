import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Link from 'next/link';

import FlatButton from 'material-ui/FlatButton';

import { GET_LOCATIONS_BY_USER } from '../graphql/queries';

const Locations = ({ filter }) => (
  <Query query={GET_LOCATIONS_BY_USER}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading</p>;
      if (error) return <p>Error</p>;

      const locations = data.getUser.locations
        .filter(location =>
          location.id.toLowerCase().includes(filter.toLowerCase()) ||
            location.name.toLowerCase().includes(filter.toLowerCase()))
        .map(location => (
          <Link key={location.id} prefetch href={`/location?id=${location.id}`}>
            <FlatButton style={{ margin: '5px' }}>
              {`${location.name}
            (${location.id})`}
            </FlatButton>
          </Link>
        ));

      return locations.length ? locations : 'No locations found';
    }}
  </Query>
);

Locations.propTypes = {
  filter: PropTypes.string
};

export { Locations };
