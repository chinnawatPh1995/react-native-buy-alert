import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';
import RegisterReducers from './RegisterReducers';
import TodoFormReducers from './TodoFormReducers'
import TodoReducer from './TodoReducer';
import PromoFormReducers from './PromoFormReducers';

export default combineReducers({
    auth : AuthReducers,
    register : RegisterReducers,
    todoForm : TodoFormReducers,
    todo : TodoReducer,
    promoForm : PromoFormReducers
});