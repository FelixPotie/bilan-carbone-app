import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './index.css';
import App from './App';
import AppAdmin from './App.admin';
import reportWebVitals from './reportWebVitals';
import { AppBar } from '@material-ui/core';
import './i18n'

// create history for the user
const hist = createBrowserHistory();

const renderApp = () => {
    // Mount the main component with the router
    ReactDOM.render(
        <React.StrictMode>
            <Router history={hist}>
                <Switch>
                    <Route path={'/admin'} component={AppAdmin} />;
                    <Route path={'/'} component={App} />;
                </Switch>
            </Router>
        </React.StrictMode>, document.getElementById('root'));
}

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
