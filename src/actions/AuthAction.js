import Validator from 'validator';
import firebase from 'react-native-firebase';

import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    EMAIL_FAIL,
    PASSWORD_FAIL,
    LOGIN_USER
} from "./types";
import { Actions } from 'react-native-router-flux';

export const emailChanged = (email) => {
    if(!Validator.isEmail(email)){
        return {
            type: EMAIL_FAIL,
            payload: email
        };
    }else{
        return {
            type: EMAIL_CHANGED,
            payload: email
        };
    }
};

export const passwordChanged = (password) => {
    const length = password.length;
    if(length < 8){
        return {
            type: PASSWORD_FAIL,
            payload: password,
        }
    }else{
        return {
            type: PASSWORD_CHANGED,
            payload : password,
        };
    }
};

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
    startLoginUser(dispatch);

    firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
        .then((user) => loginUserSuccess(dispatch,user))
        .catch(() => loginUserFail(dispatch));
    };
};

const startLoginUser = (dispatch) => {
    dispatch({type : LOGIN_USER});
}

const loginUserSuccess = (dispatch, user) => {
    dispatch({type: LOGIN_USER_SUCCESS, payload: user})
    Actions.main();
}

const loginUserFail = (dispatch) => {
    dispatch({type : LOGIN_USER_FAIL});
}