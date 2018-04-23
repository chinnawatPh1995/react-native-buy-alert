import { PROMO_FETCH_SUSSES } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case PROMO_FETCH_SUSSES:
            return action.payload;
        default:
            return state;
    }
}