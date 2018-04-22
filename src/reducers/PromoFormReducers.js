import { PROMO_CHANGED } from "../actions/types";


const INITAIL_STATE = {
    promotionName: '',
    descriptions: '',
    storeName: '',
    dateS: '',
    dateF:'',
}

export default (state = INITAIL_STATE, action) => {
    switch(action.type){
        case PROMO_CHANGED:
            return {
                ...state, [action.payload.prop] : action.payload.value
            }
        default:
            return INITAIL_STATE;
    }
}