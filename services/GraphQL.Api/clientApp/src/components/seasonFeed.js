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
        <React.Fragment>
          <Helmet title="Seasons" />    
          <section>
              <h2>Seasons</h2>
          </section>
          <div className="row p-2">
            {data.seasons.map(l =>
              <Season key={l.id} {...l}/>
            )}
        </div>
        </React.Fragment>
       ); 
    }}
  </Query>
);
