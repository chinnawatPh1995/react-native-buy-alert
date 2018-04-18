import {
    TODO_UPDATE, TODO_ADD
} from '../actions/types';

const INITIAL_STATE = {
    work: '',
    descriptions: '',
    categories: ''
}
export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case TODO_UPDATE:
            return {
                ...state, [action.payload.prop] : action.payload.value
            }
        case TODO_ADD: 
            return INITIAL_STATE;
        default:
            return state;
    }; // switch
};