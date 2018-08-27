import React, { Component } from 'react';
import { ApolloProvider } from "react-apollo";

import {client} from "./service/apollo"
import {Players} from "./components/players"
//TEST ONLY
// import gql from "graphql-tag";


import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Message-Queue React</h1>
          </header>
          <p className="App-intro">
            <Players />
          </p>
        </div>
      </ApolloProvider>

    );
  }
}

// client
//   .query({
//     query: gql`
//       {
//         players {
//           id
//           name
//         }
//       }
//     `
//   })
//   .then(result => console.log(result)); 


export default App;
