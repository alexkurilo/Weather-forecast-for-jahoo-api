const initialState = {};

export default function resultLinkItem (state = initialState, action){
    if (action.type === 'ON_LINK_ITEM') {
        return action.payload;
    }
    return state;
}