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
        <React.Fragment>
          <Helmet title="Teams" />    
          <section>
              <h2>Teams</h2>
            </section>
            <div className="row p-2">
              {data.teams.map(t =>
                <Team key={t.id} {...t}/>
              )}
            </div>
        </React.Fragment>
       ); 
    }}
  </Query>
);
