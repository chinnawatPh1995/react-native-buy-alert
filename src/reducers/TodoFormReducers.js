import {
    TODO_CHANGED, TODO_ADD, TODO_SAVE_SUSSES
} from '../actions/types';

const INITIAL_STATE = {
    work: '',
    descriptions: '',
    categories: ''
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
        default:
            return state;
    }; // switch
};