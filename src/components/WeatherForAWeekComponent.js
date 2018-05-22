import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Router, Route, Switch} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import {connect} from 'react-redux';
import './WeatherForAWeekComponent.css';
import ForecastComponent from "./ForecastComponent";

const history = createBrowserHistory();

/*export default class WeatherForAWeekComponent extends Component {
    PropsFunc(){
        console.log(this.props);
    }

    OnDayOfWeek (day) {
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
    }

    render() {
        console.log(this.props.location.pathname);
        console.log("/"+this.props.item.forecast.location.city);
        console.log(this.props.location.pathname === ("/"+this.props.item.forecast.location.city));
        if (this.props.location.pathname === ("/"+this.props.item.forecast.location.city)){
            return (
                <div>
                    <Link to='/'>
                        Hidden the weather for 10 days in {this.props.item.forecast.location.city}.
                    </Link>
                    {this.props.item.forecast.item.forecast.map((itemW, index)=>
                        <section    className='cityCard'
                                    key = {index}
                        >
                            <section>{this.OnDayOfWeek(itemW.day)}:
                                <img src={'http://l.yimg.com/a/i/us/we/52/' + itemW.code + ".gif"}/>
                                {itemW.high}&#176;{this.props.item.forecast.units.temperature},
                                {itemW.low}&#176;{this.props.item.forecast.units.temperature}
                            </section>
                        </section>
                    )}
                </div>
            )
        }else{
            return(
                <div>
                    <Link to={this.props.item.forecast.location.city}>

                    </Link>
                </div>
            )
        }
        /!*console.log(this.props);
        return (
            <div>
                <Link to='/'>
                    Hidden the weather for 10 days in this city.
                </Link>
            </div>
        )*!/
    }
}*/

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
        //event.preventDefault();
        //console.log("click");
        //console.log(index);
        //console.log(item);
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
                            Hidden the weather for 10 days in {resultLinkItem.location.city}.
                        </Link>
                        <Route exact path="/" component={ForecastComponent}>
                        </Route>
                    </Switch>
                </Router>
                <div>
                    <b>Weather for 10 days</b>
                </div>
                <div>
                    <b>in {resultLinkItem.location.city}</b>
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
                        <section>{OnDayOfWeek(itemW.day)}:
                            <img src={'http://l.yimg.com/a/i/us/we/52/' + itemW.code + ".gif"}/>
                            {itemW.high}&#176;{resultLinkItem.units.temperature},
                            {itemW.low}&#176;{resultLinkItem.units.temperature}
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