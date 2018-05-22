import React, { Component } from 'react';
import './App.css';
import CountriesComponent from './components/countriesComponent';
import ForecastComponent from './components/ForecastComponent';
import WeatherForAWeekComponent from './components/WeatherForAWeekComponent';
import { Link } from 'react-router';

import {Router, Route, Switch} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
//import {Router, Route, IndexRoute, browserHistory} from 'react-router';

const history = createBrowserHistory();


class App extends Component {

    render() {
        return (
            <div className="App">
                <CountriesComponent></CountriesComponent>
                <ForecastComponent></ForecastComponent>
                <WeatherForAWeekComponent/>

                {/*<Router history={browserHistory}>
                    <Route path="/1" component={WeatherForAWeekComponent}/>
                    <Route path="/" component={App}>
                    </Route>
                </Router>*/}
            </div>
        );
    }
}

export default App;
