import firebase from 'react-native-firebase';

import {
    PROMO_CHANGED, PROMO_ADD
} from './types';

export const promoChanged = ({prop,value}) => {
    console.log(prop, value)
    return {
        type: PROMO_CHANGED,
        payload: {prop,value}
    };
}

export const promotionAdd = ({promotionName, descriptions,storeName,dateS,dateE,image}) => {
    const { currentUser } = firebase.auth();
    const db = firebase.database();
    const dbAdd = db.ref(`/promotion/${currentUser.uid}/promotionList`);

    return (dispatch) => {
        dbAdd.push({promotionName, descriptions,storeName,dateS,dateE,image})
        .then(() => {
            dispatch({type: PROMO_ADD});
            Action.main();
        })
        .catch(()=> console.log("No !!!!"))
    }
}
