const initialState = false;

export default function onGetInfo (state = initialState, action){
    if (action.type === 'ON_GET') {
        return action.payload;
    }
    return state;
}