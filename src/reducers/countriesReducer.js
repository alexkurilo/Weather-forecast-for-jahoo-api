const initialState = [];

export default function countryInfo (state = initialState, action){
    if (action.type === 'FETCH_COUNTRIES') {
    	return action.payload;
    }
    return state;
}

