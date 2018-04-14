import {EMAIL_CHANGED,
    PASSWORD_CHANGED,
    CONFIRM_PASS_CHANGED,
    PASSWORD_NOT_MATCH,
    REGISTER_SUSSES,
    REGISTER_FAIL,
    LOGIN_USER,
} from '../actions/types';

const INITIAL_STATE = {
    confirmPass: '',
    reErrros: {
        confirmPass: '',
        auth: '',
    },
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONFIRM_PASS_CHANGED: 
            return {
                ...state, confirmPass: action.payload,
                reErrros: {...state.reErrros, confirmPass: ''}
            };
        case PASSWORD_NOT_MATCH: 
            return {
                ...state, confirmPass: action.payload,
                reErrros: {...state.reErrros, confirmPass: 'Password is not match'}
            };
        case REGISTER_SUSSES: 
            return {
                ...state, loading: false,
                reErrros: {...state.reErrros, auth: ''}
            };
        case REGISTER_FAIL: 
            return {
                ...state, loading: false,
                reErrros: {...state.reErrros, auth: 'Register Failed.'}
            };
        case LOGIN_USER: 
            return {
                ...state, loading: true,
                reErrros: {...state.reErrros,
                    confirmPass: '',
                    auth: ''
                }
            };
        default:
            return state;
    }
  };
