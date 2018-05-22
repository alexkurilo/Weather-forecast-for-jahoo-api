//import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
//import { render } from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';
//import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Router, Route, Switch} from "react-router-dom"
import createBrowserHistory from "history/createBrowserHistory"

import {syncHistoryWithStore} from 'react-router-redux';
import WeatherForAWeekComponent from './components/WeatherForAWeekComponent';

import './index.css';
import App from './App';
import reducer from './reducers/indexReducer';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
//const history = syncHistoryWithStore(browserHistory, store);
const history = createBrowserHistory();
const user = {name: 'FooBarBaz'};

ReactDOM.render(
    <Provider store={store}>
        {/*<Router history={history}>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route exact path="/1" render={(props) => <WeatherForAWeekComponent user={user}/>}/>
            </Switch>
        </Router>*/}
        <App/>
    </Provider>,
    document.getElementById('root')
);

