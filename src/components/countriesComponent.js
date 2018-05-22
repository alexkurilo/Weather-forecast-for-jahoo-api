import React, { Component } from 'react';
import {connect} from 'react-redux';

import {asyncGetCountriesAndCities} from '../actions/countriesAndCitiesAction';
import {asyncGetForecast} from '../actions/getForecastAction';

import './countriesComponent.css';

let showCountry=[];
let showCity=[];
let cityInputInitial = '';
let enterCountry= "";

const CountriesComponent = ({   onshow, onShow, filterCountry, countriesAndCitiesInfo, filterCity, onFindCity,
                                onFetchCities, findCountries, onFindCountry, onGet, onGetCountriesAndCities, onGetInfo,
                                findCities, onResultForRequest, onGetForecast, resultForRequest                 }) => {

    const handleKeyPressCountry = (event) => {
        console.log(this.countryInput.value);
        if (event.key === 'Enter') {
            ShowCountryBtn();
            this.countryInput.value = "";
            //showCountry = "";
        }
        console.log(this.countryInput.value);
    };

    const FindCountry = () => {
        onFindCountry(this.countryInput.value);
        //this.countryInput.value = "";
        console.log(this.countryInput.value);
    };

    const ShowCountry = (event) =>{
        //console.log(event.target.value);
        showCountry = event.target.value;
        //console.log(showCountry);
        onShow("none","block","block","none");
        //this.cityInput.value = "";
        //console.log(this.cityInput.value);
    };


    const ShowCountryBtn = () => {
        showCountry = filterCountry;
        //console.log("click", showCountry);
        onShow("none","block","block","none");
    };

    const handleKeyPressCity = (event) => {
        if (event.key === 'Enter') {
            this.cityInput.value = "";
            ShowCityBtn();
            console.log(showCity);
        }
    };

    const FindCity = () => {
        //console.log("find city click");
        onFindCity(this.cityInput.value);
        //this.cityInput.value = "";
    };

    const ShowCity = (event) => {
        //console.log(event.target.value);
        showCity = event.target.value;
        onShow("block","block","none","block");
        //console.log (this.props.resultForRequest);
        onResultForRequest( resultForRequest.length, showCountry, showCity, "block", "none");
        onGetForecast(resultForRequest.length, showCity);
    };

    const ShowCityBtn = () => {
        showCity = filterCity;
        onShow("block","block","none","block");
        onResultForRequest( resultForRequest.length, showCountry, showCity, "block", "none");
        onGetForecast(resultForRequest.length, showCity);
        return showCity;
    };

    const ShowListCountry = () => {
        return findCountries.map ((country, countryNumber)=>
            <section    key = {countryNumber+country}
                        onClick={ShowCountry}>
                <input      defaultValue={country}
                            className="countryInput"
                />
            </section>
        );
    };

    const ShowListCity = () => {
        let cities = countriesAndCitiesInfo[showCountry];
        //console.log(cities);
        if (cities !== undefined){
        /*if (filterCity !== "" ){*/
            let citiesSort = cities.sort();
            for (let i=0; i <= citiesSort.length-1; i++){
                if(citiesSort[i] === citiesSort[i-1]){
                    citiesSort.splice(i,1);
                }
            }
            onFetchCities(citiesSort);
            return findCities.map ((city, cityNumber)=>
                <section    key = {cityNumber+city}
                            onClick={ShowCity}>
                    <input  defaultValue={city}
                            className="cityInput"
                    />
                </section>
            );
        }
    };

    const OnGet = () => {
        onGetCountriesAndCities();
        onGet(!onGetInfo);
    };

    if (onGetInfo === false){
        OnGet();
    };

    return (
        <div className="CountriesComponent">
            <div   style = {{display: onshow.displayEnterCountry}}>
                <div>
                    <input  className="inputData"
                            type="text"
                            ref={(input) => {this.countryInput = input}}
                            onChange={FindCountry}
                            onKeyPress={handleKeyPressCountry}
                            placeholder="Enter country name"
                    />
                </div>
                <div className="countryList">
                    {ShowListCountry()}
                </div>
            </div>
            <div   style = {{display: onshow.displayEnterCity}}>
                <div>
                    <input  className="inputData"
                            type="text"
                            ref={(input) => {this.cityInput = input}}
                            onChange={FindCity}
                            onKeyPress={(event) => handleKeyPressCity(event)}
                            placeholder="Enter city name"
                    />
                </div>
                <div className="cityList">
                    {ShowListCity()}
                </div>
            </div>
        </div>
    );
}

export default connect(
    (state, ownProps) => ({
        ownProps,
        onGetInfo: state.onGetInfo,
        countriesAndCitiesInfo: state.countriesAndCitiesInfo,
        countries: state.countryInfo,
        findCountries: state.countryInfo.filter(countryInfo => countryInfo.includes(state.filterCountry)),
        filterCountry: state.filterCountry,
        sities: state.cityInfo,
        findCities: state.cityInfo.filter(cityInfo => cityInfo.includes(state.filterCity)),
        filterCity: state.filterCity,
        onshow: state.onshow,
        resultForRequest: state.resultForRequest,
        forecastInfo: state.forecastInfo
    }),
    dispatch => ({
        onGet: (onGetInfo) =>{
            const payload = onGetInfo;
            dispatch({type: 'ON_GET', payload})
        },
        onGetCountriesAndCities: () => {
            dispatch(asyncGetCountriesAndCities());
        },
        onFindCountry: (findCountry) => {
            const payload = findCountry;
            dispatch({type: "FIND_COUNTRY", payload})
        },
        onFindCity: (findCity) => {
            const payload = findCity;
            dispatch({type: "FIND_CITY", payload})
        },
        onShow: (displayEnterCountry,displayShowCountry,displayEnterCity,displayShowCity) => {
            const payload={
                displayEnterCountry,
                displayShowCountry,
                displayEnterCity,
                displayShowCity
            };
            dispatch({type: "ON_SHOW", payload})
        },
        onFetchCities: (cityInfo) => {

            const payload = cityInfo;
            dispatch({type: "FETCH_CITIES", payload})
        },
        onResultForRequest: (id, country, city, forecast, inShow) => {
            const payload = {
                id,
                country,
                city,
                forecast,
                inShow,
            };
            dispatch ({type: "RESULT_FOR_REQUEST", payload})
        },
        onGetForecast: (id, city) => {
            //console.log(city);
            dispatch(asyncGetForecast(id, city));
        }
    })
)(CountriesComponent);