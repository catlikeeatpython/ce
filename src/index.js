import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { Provider } from "react-redux";
import App from './layout/App.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    {/* <Provider> */}
        <Switch>
            <Route path='/' component = { App } />
        </Switch>
    {/* </Provider> */}
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
