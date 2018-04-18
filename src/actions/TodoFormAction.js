import firebase from 'react-native-firebase';

import {
    TODO_UPDATE, TODO_ADD, TODO_FETCH_SUSSES,
} from './types';
import { Actions } from 'react-native-router-flux';

export const todoUpdate = ({prop,value}) => {
    console.log(prop,value)
    return {
        type: TODO_UPDATE,
        payload: {prop,value}
    };
}
export const todoAdd = ({ work , descriptions, categories }) => {
    const { currentUser } = firebase.auth();
    const db = firebase.database();
    const todos = db.ref(`/todos/${currentUser.uid}/todolist`);

    return(dispatch) => {
        todos.push({work, descriptions, categories})
        .then(() => {
            dispatch({type: TODO_ADD});
            Actions.main();
        })
        .catch(() => console.log("NO !!!!"))
    }
};

export const todoFetch = () => {
    const { currentUser } = firebase.auth();
    const todos = firebase.database().ref(`/todos/${currentUser.uid}/todolist`);

    return (dispatch) => {
        todos.on('value', snapshot => {
            dispatch({
                type: TODO_FETCH_SUSSES,
                payload: snapshot.val()
            });
        });
    };
}
