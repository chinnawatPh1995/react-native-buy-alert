import firebase from 'react-native-firebase';

import {
    PROMO_CHANGED, PROMO_ADD, PROMO_FETCH_SUSSES
} from './types';
import { Actions } from 'react-native-router-flux';

export const promoChanged = ({prop,value}) => {
    return {
        type: PROMO_CHANGED,
        payload: {prop,value}
    };
}

export const promotionAdd = ({promotionName, descriptions,storeName,dateS,dateE,image,lat,long}) => {
    const { currentUser } = firebase.auth();
    const db = firebase.database();
    const dbAdd = db.ref(`/promotion/${currentUser.uid}/promotionList`);

    return (dispatch) => {
        dbAdd.push({promotionName, descriptions,storeName,dateS,dateE,image,lat,long})
        .then(() => {
            dispatch({type: PROMO_ADD});
            Actions.tab2();
        })
        .catch(()=> console.log("No !!!!"))
    }
}

export const promotionFetch = () => {
    const { currentUser } = firebase.auth();
    const db = firebase.database();
    const dbAdd = db.ref(`/promotion/${currentUser.uid}/promotionList`);

    return (dispatch) => {
        dbAdd.on('value', snapshot => {
            console.log(snapshot);
            dispatch({
                type: PROMO_FETCH_SUSSES,
                payload: snapshot.val()
            });
        });
    };
}