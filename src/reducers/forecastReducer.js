const initialState = [];

export default function forecastInfo (state = initialState, action){
    switch (action.type) {
        case "FETCH_FORECAST":
            return [
                ...state,
                action.payload
            ];

        case 'ON_SHOW_WEEK':
            return state.map((item, index) => {
                //console.log(action.payload);
                if (index === action.payload) {
                    return Object.assign({}, item, {
                        display: "inline",
                        nonDisplay: "none"
                    });
                }
                return item;
            })

        case 'NON_SHOW_WEEK':
            return state.map((item, index) => {
                //console.log(action.payload);
                if (index === action.payload) {
                    return Object.assign({}, item, {
                        display: "none",
                        nonDisplay: "inline"
                    });
                }
                return item;
            })

        case 'ON_CLOSE':
            console.log(action.payload);
            state.splice(action.payload, 1);
            return [
                ...state
            ];

        default:
            return state;
    }
}
