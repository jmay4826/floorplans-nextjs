import gql from 'graphql-tag';

export const GET_LOCATION = gql`
  query getLocation($id: String!) {
    getLocation(id: $id) {
      id
      name
      latitude
      longitude
      floorplan
      district
      active
      height
      width
      comments {
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
  }
`;

export const GET_NEW_COMMENT = gql`
  query newComment {
    newComment @client {
      open
      author
      id
      location
      content
      x
      y
    }
  }
`;

export const GET_LOCATIONS_BY_USER = gql`
  query {
    getUser {
      locations {
        id
        name
      }
    }
  }
`;
