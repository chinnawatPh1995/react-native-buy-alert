import {
    TODO_CHANGED, TODO_ADD, TODO_SAVE_SUSSES, TODO_DELECTED, TODO_CLEAR_STATE
} from '../actions/types';

const INITIAL_STATE = {
    work: '',
    descriptions: '',
    categories: '',
    image: null,
}
export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case TODO_CHANGED:
            return {
                ...state, [action.payload.prop] : action.payload.value
            }
        case TODO_ADD: 
            return INITIAL_STATE;
        case TODO_SAVE_SUSSES:
            return INITIAL_STATE;
        case TODO_DELECTED: 
            return INITIAL_STATE;
        case TODO_CLEAR_STATE:
            return INITIAL_STATE;
        default:
            return state;
    }; // switch
};