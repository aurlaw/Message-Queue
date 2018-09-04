import React from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";
import Helmet from "react-helmet/lib/Helmet";
import Link from 'react-router-dom/Link';


import Player from "./player";

const GET_PLAYERS = gql`
      {
        players {
          id
          name
          height
          weightLbs
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
          <React.Fragment>
            <Helmet title="Players" />    
            <section>
                <h2>Players <Link to={'/add'} className="btn btn-primary pull-right">+ Player</Link>
                </h2>
              </section>
                <div className="row">
                {data.players.map(p => 
                  <div key={p.id} className="col-md-4">
                    <Player {...p} />
                  </div>
                )}
              </div>
          </React.Fragment>
       ); 
    }}
  </Query>
);
