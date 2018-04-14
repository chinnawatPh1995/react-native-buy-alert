import React, { Component } from 'react';
import {Text, View} from 'react-native';

import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import Routers from './Routers';

class App extends Component {

componentDidMount(){
    const config = {
        apiKey: 'AIzaSyDpAlvJckGtDqAgiHOZqD0o1FzHmPlHOMg',
        authDomain: 'knock-26bff.firebaseapp.com',
        databaseURL: 'https://knock-26bff.firebaseio.com',
        projectId: 'knock-26bff',
        storageBucket: 'knock-26bff.appspot.com',
        messagingSenderId: '74296058149'
    };
    firebase.initializeApp(config);
}
    render(){
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return(
            <Provider store = {store} >
                <Routers/>
            </Provider>
        );
    }
}
export default App;