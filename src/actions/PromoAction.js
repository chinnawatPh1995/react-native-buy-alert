import firebase from 'react-native-firebase';

import {
    PROMO_CHANGED, PROMO_ADD, PROMO_FETCH_SUSSES, PROMO_SAVE, PROMO_CLEAR, PROMO_DELECTED
} from './types';
import { Actions } from 'react-native-router-flux';

export const promoChanged = ({prop,value}) => {
    console.log('Action : ',value)
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
            dispatch({
                type: PROMO_FETCH_SUSSES,
                payload: snapshot.val()
            });
        });
    };
}

export const promoSaveChanged = ({promotionName, descriptions,storeName,dateS,dateE,image,lat,long, uid}) => {
    const { currentUser } = firebase.auth();
    const db = firebase.database();
    const dbAdd = db.ref(`/promotion/${currentUser.uid}/promotionList/${uid}`);

    return (dispatch) => {
        dbAdd.set({promotionName, descriptions,storeName,dateS,dateE,image,lat,long})
        .then(() => {
            dispatch({type: PROMO_SAVE});
            Actions.tab2();
        })
        .catch(()=> console.log("No !!!!"))
    }
}

export const promoRemove = ({promotionName, descriptions,storeName,dateS,dateE,image,lat,long, uid}) => {
    const { currentUser } = firebase.auth();
    const db = firebase.database();
    const remove = db.ref(`/promotion/${currentUser.uid}/promotionList/${uid}`);
    const desertRef = firebase.storage().refFromURL(image);
    if(image != null){
        return(dispatch) => {
            remove.remove({promotionName, descriptions,storeName,dateS,dateE,lat,long,})
            .then(() => {
                desertRef.delete().then(() => {
                    dispatch({type:PROMO_CLEAR});
                    Actions.proeditlist();
                })
            })
        }
    }else{
        return(dispatch) => {
            remove.remove({promotionName, descriptions,storeName,dateS,dateE,lat,long,})
            .then(() => {
                dispatch({type:PROMO_CLEAR});
                Actions.proeditlist();
            })
        }
    }
}

export const promotionClear = () => {
    Actions.proeditlist();
    return{
        type: PROMO_CLEAR,
    }
}