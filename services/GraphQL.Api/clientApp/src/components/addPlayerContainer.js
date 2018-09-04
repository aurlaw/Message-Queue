import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import Helmet from "react-helmet/lib/Helmet";


import {playersQuery, createPlayerMutation} from '../graphql'

import PlayerAdd from "./playerAdd"


import "./addPlayerContainer.css"

export const AddPlayerContainer = () => (
        <React.Fragment>
            <Helmet title="Add Player" />  
            <section>
                <h2>Add Player</h2>
            </section>
            <div className="row p-2">
                <PlayerAdd onHandleSubmission={data => {
                    console.log('onHandleSubmission', data);
                }} />
            </div>
        </React.Fragment>
);

/**
 * 
 * 
mutation ($player: PlayerInput!, $skaterStats: [SkaterStatisticInput]) {
    createPlayer(player: $player, skaterStats: $skaterStats) {
        id name skaterSeasonStats {
          id
        }
    }
} * 
 * 
 
 * 
 */