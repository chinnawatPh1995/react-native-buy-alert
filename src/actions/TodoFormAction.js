import firebase from 'react-native-firebase';

import {
    TODO_CHANGED, TODO_ADD, TODO_FETCH_SUSSES,
    TODO_SAVE_SUSSES, TODO_DELECTED, TODO_CLEAR_STATE
} from './types';
import { Actions } from 'react-native-router-flux';

export const todoChanged = ({prop,value}) => {
    return {
        type: TODO_CHANGED,
        payload: {prop,value}
    };
}
export const todoAdd = ({ work , descriptions, categories, image }) => {
    const { currentUser } = firebase.auth();
    const db = firebase.database();
    const todos = db.ref(`/todos/${currentUser.uid}/todolist`);

    return(dispatch) => {
        todos.push({work, descriptions, categories, image})
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

export const todoSaveChanged = ({work, descriptions, categories,uid}) => {
    const { currentUser } = firebase.auth();
    const todo = firebase.database().ref(`/todos/${currentUser.uid}/todolist/${uid}`);

    return (dispatch) => {
        todo.set({work, descriptions, categories})
        .then(() => {
            dispatch({type: TODO_SAVE_SUSSES})
            Actions.main();
        })
    }
}

export const todoDelected = ({work, descriptions, categories,image,uid}) => {
    const { currentUser } = firebase.auth();
    const todo = firebase.database().ref(`/todos/${currentUser.uid}/todolist/${uid}`);
    const desertRef = firebase.storage().refFromURL(image)
    return(dispatch) => {
        todo.remove({work, descriptions, categories,image })
        .then(() => {
            desertRef.delete().then(() => {
                dispatch({type:TODO_DELECTED});
                Actions.main();
            })
        });
    }
}

export const todoClearState = () =>{
    Actions.main();
    return {
        type: TODO_CLEAR_STATE,
    }
}