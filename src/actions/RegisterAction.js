import Validator from 'validator';
import {auth} from '../config/firebase';

import {
    CONFIRM_PASS_CHANGED,
    PASSWORD_NOT_MATCH,
    REGISTER_SUSSES,
    REGISTER_FAIL,
    REGISTER_USER,
} from './types';
import { Actions } from 'react-native-router-flux';

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
        auth.createUserWithEmailAndPassword(email,password)
            .then((user) => registerSusses({dispatch,user}))
            .catch(() => registerFail(dispatch))
    };
};
const startLoginUser = (dispatch) => {
    dispatch({type: REGISTER_USER});
}
const registerSusses = ({dispatch,user}) => {
    dispatch({type: REGISTER_SUSSES, payload: user});
    Actions.main();
}
const registerFail = (dispatch) => {
    dispatch({type: REGISTER_FAIL});
}

