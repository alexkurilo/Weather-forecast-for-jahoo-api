const initialState = [];

export default function resultForRequest (state = initialState, action){
    if (action.type === 'RESULT_FOR_REQUEST') {
        return [
            ...state,
            action.payload
        ];
    }
    return state;
}