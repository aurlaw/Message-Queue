// IE 10 => support
import 'core-js/es6/map';
import 'core-js/es6/set';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from "react-apollo";
import {client} from "./service/apollo"


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>,
    document.getElementById('root')
  )

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
