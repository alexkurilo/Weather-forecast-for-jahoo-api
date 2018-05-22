import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Router, Route, Switch} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import {connect} from 'react-redux';
import './WeatherForAWeekComponent.css';
import ForecastComponent from "./ForecastComponent";

const history = createBrowserHistory();

const WeatherForAWeekComponent = ({resultLinkItem, onLinkItem}) => {
    console.log(resultLinkItem);
    console.log(this.props);
    let lenghtItem = Object.keys(resultLinkItem).length;

    const OnDayOfWeek = (day) => {
        switch (day) {
            case 'Mon':
                return "Monday";
            case 'Tue':
                return "Tuesday";
            case 'Wed':
                return "Wednesday";
            case 'Thu':
                return "Thursday";
            case 'Fri':
                return "Friday";
            case 'Sat':
                return "Saturday";
            default:
                return "Sunday";
        }
    };

    const LinkFunk = (event) => {
        let a = {};
        onLinkItem(a);
    };

    if ((Object.keys(resultLinkItem).length !== 0)) {
        return (
            <div className="container">
                <Router history={history}>
                    <Switch>
                        <Link to='/'
                              onClick={(event) => LinkFunk(event)}>
                            <p>
                                <i>
                                    Hidden the weather for 10 days in {resultLinkItem.location.city}.
                                </i>
                            </p>
                        </Link>
                        <Route exact path="/" component={ForecastComponent}>
                        </Route>
                    </Switch>
                </Router>
                <div>
                    <b>Weather for 10 days in {resultLinkItem.location.city}</b>
                </div>
                <div>
                    <b>{resultLinkItem.location.country}</b>
                </div>
                <div>
                    <b>{resultLinkItem.location.region}</b>
                </div>
                {resultLinkItem.item.forecast.map((itemW, index)=>
                    <section    className='weatherCityCard'
                                key = {index}
                    >
                        <section>
                            <b>{OnDayOfWeek(itemW.day)}, {itemW.date}:</b>
                            <img src={'http://l.yimg.com/a/i/us/we/52/' + itemW.code + ".gif"}/>
                            <b>day temperature: {itemW.high}&#176;{resultLinkItem.units.temperature},
                            night temperature: {itemW.low}&#176;{resultLinkItem.units.temperature}</b>
                        </section>
                    </section>
                )}
            </div>
        )
    }else{
        return (
            <div></div>
        )
    }
};
/*
code(pin): "30"
date(pin): "22 May 2018"
day(pin): "Tue"
high(pin): "19"
low(pin): "15"
text(pin): "Partly Cloudy"
*/
export default connect(
    (state ) => ({
        resultLinkItem: state.resultLinkItem
    }),

    dispatch => ({
        onLinkItem: (item) => {
            const payload = item;
            console.log(item);
            dispatch({type: "ON_LINK_ITEM", payload})
        }

    })
)(WeatherForAWeekComponent);