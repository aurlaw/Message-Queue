import React, { Component } from 'react';

// import { Query } from "react-apollo";
// import gql from "graphql-tag";
import Helmet from "react-helmet/lib/Helmet";

import "./playerAdd.css"

class PlayerAdd extends Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            birthPlace: '',
            height: '',
            weightLbs: 0,
            formErrors: {name: ''},
            hasName: false,
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
      }
    
      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let hasName = this.state.hasName;
        switch(fieldName) {
          case 'name':
            hasName = value.length > 0;
            fieldValidationErrors.name = hasName ? '' : ' is required';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        hasName: hasName
                      }, this.validateForm);
      }
      validateForm() {
        this.setState({formValid: this.state.hasName});
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
                    <input type="text" className="form-control" name="weightLbs" placeholder="Weight"
                        value={this.state.weightLbs}
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