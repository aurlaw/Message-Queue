import React from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";
import Helmet from "react-helmet/lib/Helmet";

import League from './league'

const GET_LEAGUES = gql`
    {
        leagues {
            id
            name
        } 
    } 
`;


export const LeagueFeed = () => (
  <Query query={GET_LEAGUES}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
       return (
          <React.Fragment>
          <Helmet title="Leagues" />    
          <section>
              <h2>Leagues</h2>
            </section>
            <div className="row p-2">
              {data.leagues.map(l =>
                  <League key={l.id} {...l}/>
              )}
            </div>
        </React.Fragment>
       ); 
    }}
  </Query>
);
