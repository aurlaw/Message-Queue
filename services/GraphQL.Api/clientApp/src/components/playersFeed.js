import React from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";
import Helmet from "react-helmet/lib/Helmet";

import Player from "./player";

const GET_PLAYERS = gql`
      {
        players {
          id
          name
          birthPlace
          skaterSeasonStats(limit: 5 sort: true) {
              id
              points
              season
            }          
        }
      }    
`;


export const PlayersFeed = () => (
  <Query query={GET_PLAYERS}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
       return (
        <section>
          <Helmet title="Home" />    
          <h2>Players</h2>
            <div className="row">
            {data.players.map(p => 
              <div key={p.id} className="col-md-4">
                 <Player {...p} />
              </div>
            )}
          </div>
        </section>
       ); 
    }}
  </Query>
);
