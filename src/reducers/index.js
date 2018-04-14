import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';
import RegisterReducers from './RegisterReducers';

export default combineReducers({
    auth : AuthReducers,
    register : RegisterReducers
});