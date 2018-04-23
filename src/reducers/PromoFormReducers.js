import { PROMO_CHANGED, PROMO_ADD } from "../actions/types";


const INITAIL_STATE = {
    promotionName: '',
    descriptions: '',
    storeName: '',
    dateS: '',
    dateF:'',
    image: null,
    lat: '',
    long: ''
}

export default (state = INITAIL_STATE, action) => {
    switch(action.type){
        case PROMO_CHANGED:
            return {
                ...state, [action.payload.prop] : action.payload.value
            }
        case PROMO_ADD:
            return INITAIL_STATE;
        default:
            return INITAIL_STATE;
    }
}