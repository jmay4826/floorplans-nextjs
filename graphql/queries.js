// @flow
import gql from "graphql-tag";

export const GET_LOCATION: Object = gql`
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

export const GET_NEW_COMMENT: Object = gql`
  {
    newComment @client {
      id
      location
      content
      x
      y
    }
  }
`;
