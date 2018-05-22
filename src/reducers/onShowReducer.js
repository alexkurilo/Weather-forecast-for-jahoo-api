const initialState = {
	displayEnterCountry: "block",
    displayShowCountry: "none",
    displayEnterCity: "none",
    displayShowCity: "none"
};

export default function onshow (state = initialState, action){
    if (action.type === 'ON_SHOW') {
    	return action.payload;
    }
    return state;
}