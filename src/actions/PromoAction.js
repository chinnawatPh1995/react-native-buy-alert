import firebase from 'react-native-firebase';

import {
    PROMO_CHANGED
} from './types';

export const promoChanged = ({prop,value}) => {
    console.log(prop, value)
    return {
        type: PROMO_CHANGED,
        payload: {prop,value}
    };
}
