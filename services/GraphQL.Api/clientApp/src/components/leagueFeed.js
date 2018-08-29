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
          <section>
            <Helmet title="Leagues" />    
              <h2>Leagues</h2>
              {data.leagues.map(l =>
                <League key={l.id} {...l}/>
              )}
          </section>
       ); 
    }}
  </Query>
);
