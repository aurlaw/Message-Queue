import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import Helmet from "react-helmet/lib/Helmet";


import {playersQuery, teamsQuery, leaguesQuery, seasonsQuery, createPlayerMutation} from '../graphql'


import "./playerAdd.css"

class PlayerAdd extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            leagueId: '',
            seasonId: '',
            teamId: '',
            birthPlace: '',
            height: '',
            weightLbs: 0,
            gamesPlayed: 0,
            goals: 0,
            assists: 0,
            points: 0,
            plusMinus: 0,
            formErrors: {name: ''},
            hasName: false,
            hasLeague: false,
            hasSeason: false,
            hasTeam: false,
              formValid: false
        }
      }

      handleSubmit = (e) => {
            e.preventDefault();
            console.log('submitted', this.state);
      }

      handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value},
                      () => { this.validateField(name, value) });

        switch(name) {
            case "goals":
                this.generatePoints(value, '');
            break;
            case "assists":
                this.generatePoints('',value);
            break;
            default:
            break;
        }
      }

      generatePoints(g, a) {
        let pts = 0;  
        if(g !== '') {
            pts = parseInt(g) + parseInt(this.state.assists);
          }
          if(a !== '') {
            pts = parseInt(this.state.goals) + parseInt(a);
          }
          this.setState({points: pts});   
        }
    
      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let hasName = this.state.hasName;
        let hasLeague = this.state.hasLeague;
        let hasSeason = this.state.hasSeason;
        let hasTeam = this.state.hasTeam;
        switch(fieldName) {
          case 'name':
            hasName = value.length > 0;
            fieldValidationErrors.name = hasName ? '' : ' is required';
            break;
            case 'leagueId':
                hasLeague = value.length > 0;
                fieldValidationErrors.leaguId = hasLeague ? '' : ' is required';
            break;
            case 'seasonId':
                hasSeason = value.length > 0;
                fieldValidationErrors.seasonId = hasSeason ? '' : ' is required';
            break;
            case 'teamId':
                hasTeam = value.length > 0;
                fieldValidationErrors.teamId = hasTeam ? '' : ' is required';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        hasName: hasName,
                        hasLeague: hasLeague,
                        hasSeason: hasSeason,
                        hasTeam: hasTeam
                      }, this.validateForm);
      }
      validateForm() {
        this.setState({formValid: this.state.hasName && this.state.hasLeague && this.state.hasSeason && this.state.hasTeam});
      }
    
      errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
      }

      render() {
        return (
                <React.Fragment>
                <Helmet title="Add Player" />  
                <section>
                    <h2>Add Player</h2>
                </section>
                <div className="row p-2">
                    <form className="addPlayerForm" onSubmit={this.handleSubmit}>
                    <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" placeholder="Name"
                        value={this.state.name}
                        onChange={this.handleUserInput}                    
                    />
                    </div>
                       
                    <div className="form-group">
                    <label htmlFor="birthPlace">Birth Place</label>
                    <input type="text" className="form-control" name="birthPlace" placeholder="Birth Place"
                        value={this.state.birthPlace}
                        onChange={this.handleUserInput}                                    
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="height">Height</label>
                    <input type="text" className="form-control" name="height" placeholder="Height"
                        value={this.state.height}
                        onChange={this.handleUserInput}                                    
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="weightLbs">Weight</label>
                    <input type="number" className="form-control" name="weightLbs" placeholder="Weight"
                        value={this.state.weightLbs}
                        onChange={this.handleUserInput}                    
                    />
                    </div>

                    <Query query={leaguesQuery}>
                        {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;
                        return (
                            <div className="form-group">
                                <label htmlFor="leagueId">League</label>
                                <select name="leagueId" className="form-control" value={this.state.leagueId} onChange={this.handleUserInput}>
                                    <option value="">Select League</option>
                                {data.leagues.map(l =>
                                    <option key={l.id} value={l.id}>{l.name}</option>                                
                                )}                                
                                </select>
                            </div>
                            ); 
                        }}
                    </Query>                     
                    <Query query={seasonsQuery}>
                        {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;
                        return (
                            <div className="form-group">
                                <label htmlFor="seasonId">Season</label>
                                <select name="seasonId" className="form-control" value={this.state.seasonId} onChange={this.handleUserInput}>
                                    <option value="">Select Season</option>
                                {data.seasons.map(s =>
                                    <option key={s.id} value={s.id}>{s.name}</option>                                
                                )}                                
                                </select>
                            </div>
                            ); 
                        }}
                    </Query>                     
                    <Query query={teamsQuery}>
                        {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;
                        return (
                            <div className="form-group">
                                <label htmlFor="teamId">Team</label>
                                <select name="teamId" className="form-control" value={this.state.teamId} onChange={this.handleUserInput}>
                                    <option value="">Select Team</option>
                                {data.teams.map(t =>
                                    <option key={t.id} value={t.id}>{t.name}</option>                                
                                )}                                
                                </select>
                            </div>
                            ); 
                        }}
                    </Query>         
                    <div className="form-group">
                    <label htmlFor="gamesPlayed">GP</label>
                    <input type="number" className="form-control" name="gamesPlayed" placeholder="Games Played"
                        value={this.state.gamesPlayed}
                        onChange={this.handleUserInput}                    
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="goals">Goals</label>
                    <input type="number" className="form-control" name="goals" placeholder="Goals"
                        value={this.state.goals}
                        onChange={this.handleUserInput}                    
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="assists">Assists</label>
                    <input type="number" className="form-control" name="assists" placeholder="Assists"
                        value={this.state.assists}
                        onChange={this.handleUserInput}                    
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="points">Points</label>
                    <input type="number" className="form-control" name="points" placeholder="Points"
                        value={this.state.points}
                        onChange={this.handleUserInput}                    
                    />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="plusMinus">Plus/Minus</label>
                    <input type="number" className="form-control" name="plusMinus" placeholder="Plus/Minus"
                        value={this.state.plusMinus}
                        onChange={this.handleUserInput}                    
                    />
                    </div>
                    
                                
        
                    <button type="submit" className="btn btn-primary"  disabled={!this.state.formValid}>Submit</button>
                </form>
        
                </div>
        </React.Fragment>
        );
      }

}

export default PlayerAdd;

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
 {
    "player": {
    "name": "Jaromir Jagr",
    "birthPlace": "Kladno, Czech Republic",
    "height": "6'03",
    "weightLbs": 230,
    "birthDate": "1972-02-15"
    },
    "skaterStats": [
            {
            "seasonId": 17,
            "leagueId": 1,
            "teamId": 5,
            "gamesPlayed": 82,
            "goals": 24,
            "assists": 43,
            "points": 67,
            "plusMinus": 16

    }]
        
}
 * 
 */