import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import onGetInfo from './onGetReducer';
import countryInfo from './countriesReducer';
import cityInfo from './citiesReducer';
import countriesAndCitiesInfo from './countriesAndCitiesReduser';
import filterCountry from './filterCountriesReducer';
import filterCity from './filterCitiesReducer';
import onshow from './onShowReducer';
import resultForRequest from './resultForRequestReducer';
import forecastInfo from './forecastReducer';
import resultLinkItem from './onLinkReducer';

export default combineReducers({
	routing: routerReducer,
	onGetInfo,
	cityInfo,
	countryInfo,
	countriesAndCitiesInfo,
	filterCountry,
    filterCity,
    onshow,
    resultForRequest,
    forecastInfo,
    resultLinkItem
})
