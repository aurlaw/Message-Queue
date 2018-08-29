import React from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";
import Helmet from "react-helmet/lib/Helmet";

import Season from './season'

const GET_SEASONS = gql`
    {
        seasons {
            id
            name
        } 
    } 
`;


export const SeasonFeed = () => (
  <Query query={GET_SEASONS}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
       return (
          <section>
            <Helmet title="Seasons" />    
              <h2>Seasons</h2>
              {data.seasons.map(l =>
                <Season key={l.id} {...l}/>
              )}
          </section>
       ); 
    }}
  </Query>
);
