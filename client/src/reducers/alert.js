import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [];
export default function(state = initialState, action) {
    // we get the action from alert.js (actions)
    const { type, payload } = action;
    switch (type) {
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}
// Returns the state where the alert is to later use on the component Alert.
