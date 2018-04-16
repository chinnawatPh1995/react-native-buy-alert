import * as firebase from 'firebase';
    const config = {
        apiKey: 'AIzaSyDpAlvJckGtDqAgiHOZqD0o1FzHmPlHOMg',
        authDomain: 'knock-26bff.firebaseapp.com',
        databaseURL: 'https://knock-26bff.firebaseio.com',
        projectId: 'knock-26bff',
        storageBucket: 'knock-26bff.appspot.com',
        messagingSenderId: '74296058149'
    };
    firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
export const db = firebase;
