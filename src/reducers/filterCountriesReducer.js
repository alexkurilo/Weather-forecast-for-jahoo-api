const initialState = "";

export default function filterCountry(state = initialState, action){
	if (action.type === 'FIND_COUNTRY'){
		return action.payload;
	}
	return state;
}