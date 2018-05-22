const initialState = {};

export default function countriesAndCitiesInfo (state = initialState, action){
	if (action.type === "FETCH_COUNTRIES_AND_CITIES") {
		return action.payload;
	}
	return state;
}

