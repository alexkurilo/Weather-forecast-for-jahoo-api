//import forecastInfo from "./forecastReducer";

const initialState = ["none"];

export default function onshowWeek (state = initialState, action){
    console.log(state);
    if (action.type === 'ON_SHOW_WEEK') {
        return [
            ...state,
            action.payload
        ];
    }

    return state;
}