import React from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_PLAYERS = gql`
      {
        players {
          id
          name
        }
      }    
`;


export const Players = () => (
  <Query query={GET_PLAYERS}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.players.map(({ id, name }) => (
        <div key={id}>
          <p>{`${id}: ${name}`}</p>
        </div>
      ));
    }}
  </Query>
);