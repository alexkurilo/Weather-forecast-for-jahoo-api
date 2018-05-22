const initialState = []
;

export default function cityInfo (state = initialState, action){
    if (action.type === 'FETCH_CITIES') {
        return action.payload;
    }
    return state;
}
