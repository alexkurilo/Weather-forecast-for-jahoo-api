import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Router, Route, Switch} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import {connect} from 'react-redux';
import WeatherForAWeekComponent from './WeatherForAWeekComponent';
import './ForecastComponent.css';
import NameCityComponent from "./NameCityComponent";

const history = createBrowserHistory();

const ForecastComponent = ({forecastInfo, onShowWeek, nonShowWeek, onClose, routing, onLinkItem, resultLinkItem}) => {
    console.log(routing);

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
    }

    const ParseImg = (str) => {
        let start;
        let finish;
        for (let i = 0; i <= str.length; i++) {
            if ((str[i] === "=" ) && (start === undefined)) {
                //console.log("=",i);
                start = i + 2;
            }
            if ((str[i] === ">") && (finish === undefined)) {
                //console.log(">",i);
                finish = i - 2;
            }
        }
        str = str.slice(start, finish);
        return str;
    }

    const ParseLink = (str) => {
        let start;
        for (let i = 0; i <= str.length; i++) {
            if ((str[i] === "*" ) && (start === undefined)) {
                //console.log("=",i);
                start = i + 1;
            }
        }
        str = str.slice(start);
        //console.log(str);
        return str;
    }

    const WeatherForAWeek = (event, index) => {
        event.preventDefault();
        //console.log(index);
        onShowWeek(index);
    }

    const NonWeatherForAWeek = (event, index) => {
        event.preventDefault();
        //console.log(index);
        nonShowWeek(index);
    }

    const OnClose = (event, index) => {
        onClose(index);
        //console.log(index);
    }

    const WindDirection = (data) => {
        //console.log(data);//black
        data = +data;
        //console.log(data);//blue
        if (((data) > (360 - 11.25)) && ((data) <= 11.25)) {
            return "North";
        }
        ;
        if (((data) > (1 * 360 / 16 - 11.25)) && ((data) <= (1 * 360 / 16 + 11.25))) {
            return "North-North-East";
        }
        ;
        if (((data) > (2 * 360 / 16 - 11.25)) && ((data) <= (2 * 360 / 16 + 11.25))) {
            return "North-East";
        }
        ;
        if (((data) > (3 * 360 / 16 - 11.25)) && ((data) <= (3 * 360 / 16 + 11.25))) {
            return "East-North-East";
        }
        ;
        if (((data) > (4 * 360 / 16 - 11.25)) && ((data) <= (4 * 360 / 16 + 11.25))) {
            return "East";
        }
        ;
        if (((data) > (5 * 360 / 16 - 11.25 - 11.25)) && ((data) <= (5 * 360 / 16 + 11.25))) {
            return "East-South-East";
        }
        ;
        if (((data) > (6 * 360 / 16 - 11.25 - 11.25)) && ((data) <= (6 * 360 / 16 + 11.25))) {
            return "South-East";
        }
        ;
        if (((data) > (7 * 360 / 16 - 11.25 - 11.25)) && ((data) <= (7 * 360 / 16 + 11.25))) {
            return "South-South-East";
        }
        ;
        if (((data) > (8 * 360 / 16 - 11.25 - 11.25)) && ((data) <= (8 * 360 / 16 + 11.25))) {
            return "South";
        }
        ;
        if (((data) > (9 * 360 / 16 - 11.25 - 11.25)) && ((data) <= (9 * 360 / 16 + 11.25))) {
            return "South-South-West";
        }
        ;
        if (((data) > (10 * 360 / 16 - 11.25 - 11.25)) && ((data) <= (10 * 360 / 16 + 11.25))) {
            return "South-West";
        }
        ;
        if (((data) > (11 * 360 / 16 - 11.25 - 11.25)) && ((data) <= (11 * 360 / 16 + 11.25))) {
            return "West-South-West";
        }
        ;
        if (((data) > (12 * 360 / 16 - 11.25 - 11.25)) && ((data) <= (12 * 360 / 16 + 11.25))) {
            return "West";
        }
        ;
        if (((data) > (13 * 360 / 16 - 11.25 - 11.25)) && ((data) <= (13 * 360 / 16 + 11.25))) {
            return "West-North-West";
        }
        ;
        if (((data) > (14 * 360 / 16 - 11.25 - 11.25)) && ((data) <= (14 * 360 / 16 + 11.25))) {
            return "North-West";
        }
        ;
        if (((data) > (15 * 360 / 16 - 11.25 - 11.25)) && ((data) <= (15 * 360 / 16 + 11.25))) {
            return "North-North-West";
        }
        ;
    }

    const WindChill = (data) => (Math.round(100*(data-32)/1.8)/100);

    const LinkFunk = (event, index, item) => {
        //event.preventDefault();
        //console.log("click");
        //console.log(index);
        //console.log(item);
        onLinkItem(item.forecast);
    }

    return (
        <Router history={history}>
            <Switch>
                <div className="cardArray">
                    <section>
                        {forecastInfo.map((item, index)=>
                            <div className='cityCard'
                                 key = {item.id}
                            >
                                <div className="cityCard-header">
                                    <div className="cityCard-header-logo">
                                        <img    src={(item.forecast.image.url) ? item.forecast.image.url : 'http://l.yimg.com/a/i/brand/purplelogo//uh/us/news-wea.gif'}
                                                style = {{  width: 142,
                                                    height: 18}}
                                        />
                                    </div>
                                    <div className="cityCard-header-closeButton">
                                        <img    src="https://png.icons8.com/nolan/64/000000/delete-sign.png"
                                                onClick={(event) => OnClose(event, index)}
                                                style = {{  width: 30,
                                                    height: 30}}
                                        />
                                    </div>
                                </div>
                                <div className="weatherInfo">
                                    <div className="weatherInfo-inform">
                                        <div className='weatherInfo-inform-param'>
                                            <div className="weatherInfo-inform-location">
                                                <b>
                                                    <div>{index+1}. Weather in {item.forecast.location.city},</div>
                                                    <div>{item.forecast.location.region},</div>
                                                    <div>{item.forecast.location.country}.</div>
                                                </b>
                                            </div>
                                            <div className="weatherInfo-inform-data">
                                                <div className="weatherInfo-inform-data-info">
                                                    <div className="weatherInfo-inform-data-info-param">
                                                        <div>
                                                            <div>
                                                                <b>Air temperature:</b>
                                                                {item.forecast.item.condition.temp}&#176;{item.forecast.units.temperature},
                                                            </div>
                                                            <div>
                                                                <b>Sunrise:</b>
                                                                {item.forecast.astronomy.sunrise},
                                                            </div>
                                                            <div>
                                                                <b>Sunset:</b>
                                                                {item.forecast.astronomy.sunset}
                                                            </div>
                                                        </div>
                                                        <div className='weatherInfo-inform-img'>
                                                            <img src={ParseImg(item.forecast.item.description)}
                                                                 style = {{ width: 50,
                                                                     height: 50}}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <ul>
                                                    <b>Atmosphere:</b>
                                                    <li>
                                                        humidity {item.forecast.atmosphere.humidity}%,
                                                    </li>
                                                    <li>
                                                        pressure {item.forecast.atmosphere.pressure}{item.forecast.units.pressure},
                                                    </li>
                                                    <li>
                                                        visibility {item.forecast.atmosphere.visibility}{item.forecast.units.distance},
                                                    </li>
                                                    {/*<li>
                                                rising {item.forecast.atmosphere.rising}
                                            </li>*/}
                                                </ul>
                                                <ul>
                                                    <b>Wind:</b>
                                                    <li>
                                                        chill {WindChill(item.forecast.wind.chill)}&#176;{item.forecast.units.temperature},
                                                    </li>
                                                    <li>
                                                        speed {item.forecast.wind.speed}{item.forecast.units.speed},
                                                    </li>
                                                    <li>
                                                        direction {WindDirection(item.forecast.wind.direction)}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <a href={ParseLink(item.forecast.item.link)}
                                           target="_blank">
                                            Detailed weather for today in {item.forecast.location.city}.
                                        </a>
                                    </div>
                                    {/*<button onClick = {(event) => WeatherForAWeek(event, index)}
                                        style = {{display: item.nonDisplay}}>
                                    Show the weather in <b>{item.forecast.location.city}</b> for the week.
                                </button>*/}
                                    <Link to={item.forecast.location.city}
                                          onClick={(event) => LinkFunk(event, index, item)}>
                                        Show the weather for 10 days in {item.forecast.location.city}.
                                    </Link>
                                    <Route exact path="/:city" component={NameCityComponent}
                                    >
                                    </Route>
                                </div>
                            </div>
                        )
                        }
                    </section>
                </div>
            </Switch>
        </Router>
    );
}

export default connect(
    (state, ownProps ) => ({
        forecastInfo: state.forecastInfo,
        resultLinkItem: state.resultLinkItem,
        routing: state.routing
    }),

    dispatch => ({
        onShowWeek: (indexId) => {
            const payload = indexId;
            console.log(payload);
            dispatch({type: "ON_SHOW_WEEK", payload})
        },
        nonShowWeek: (indexId) => {
            const payload = indexId;
            console.log(payload);
            dispatch({type: "NON_SHOW_WEEK", payload})
        },
        onClose: (indexId) => {
            const payload = indexId;
            console.log(payload);
            dispatch ({type: "ON_CLOSE", payload})
        },
        onLinkItem: (item) => {
            const payload = item;
            console.log(item);
            dispatch({type: "ON_LINK_ITEM", payload})
        }
    })
)(ForecastComponent);