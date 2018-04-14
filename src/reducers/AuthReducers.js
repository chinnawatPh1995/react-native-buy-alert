import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    EMAIL_FAIL,
    PASSWORD_FAIL,
    LOGIN_USER,
} from "../actions/types";

const INITAIL_STATE = {
    email : '',
    password : '',
    user: null,
    errors: {
        auth: '',
        email: '',
        password: '',
    },
    loading: false,
};

export default (state = INITAIL_STATE, action) => {
    switch (action.type){
        case EMAIL_CHANGED: 
            return {
                ...state, email: action.payload,
                errors: {...state.errors, email: ''}
            };
        case EMAIL_FAIL:
            return {
                ...state, email: action.payload,
                errors: {...state.errors, email: 'The email must be a valid email'}
            };
        case PASSWORD_CHANGED:
            return {
                ...state, password: action.payload,
                errors: {...state.errors, password: ''}
            };
        case PASSWORD_FAIL:
            return {
                ...state, password: action.payload,
                errors: {...state.errors, password: 'Password  more than 8 character'}
            };
        case LOGIN_USER_SUCCESS: 
            return {
                ...state,
                user: action.payload,
                loading: false,
                password: '',
                email: '',
                errors: {...state.errors, auth: ''}
            };
        case LOGIN_USER_FAIL:
            return {
                ...state,
                password: '',
                loading: false,
                errors: {...state.errors, auth: 'Authentication Failed.'}
            };
        case LOGIN_USER: 
            return {
                ...state, loading: true,
                errors: {...state, 
                    password: '',
                    email: '',
                    auth: ''
                },
            }
        default :
            return state;
    }
};