import Validator from 'validator';
import firebase from 'firebase';

import {
    CONFIRM_PASS_CHANGED,
    PASSWORD_NOT_MATCH,
    REGISTER_SUSSES,
    REGISTER_FAIL,
    LOGIN_USER,
} from './types';

export const reConfirmPassChanged = (password,confirmPass) => {
    if(password != confirmPass){
        return {
            type: PASSWORD_NOT_MATCH,
            payload: confirmPass
        };
    }else{
        return {
            type: CONFIRM_PASS_CHANGED,
            payload: confirmPass,
        };
    }
};

export const registerUser = ({email , password}) => {
    return (dispatch) => {
        startLoginUser(dispatch);
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(() => registerSusses(dispatch))
            .catch(() => registerFail(dispatch))
    };
};
const startLoginUser = (dispatch) => {
    dispatch({type: LOGIN_USER});
}
const registerSusses = (dispatch) => {
    dispatch({type: REGISTER_SUSSES});
}
const registerFail = (dispatch) => {
    dispatch({type: REGISTER_FAIL});
}

