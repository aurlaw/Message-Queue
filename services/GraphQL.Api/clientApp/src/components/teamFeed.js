import React from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";
import Helmet from "react-helmet/lib/Helmet";

import Team from './team'

const GET_TEAMS = gql`
    {
        teams {
            id
            name
        } 
    } 
`;


export const TeamFeed = () => (
  <Query query={GET_TEAMS}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
       return (
          <section>
            <Helmet title="Teams" />    
              <h2>Teams</h2>
              {data.teams.map(t =>
                <Team key={t.id} {...t}/>
              )}
          </section>
       ); 
    }}
  </Query>
);
