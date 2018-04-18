import {TODO_FETCH_SUSSES} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case TODO_FETCH_SUSSES:
            console.log(action);
            return action.payload;
        default:
            return state;
    }
}