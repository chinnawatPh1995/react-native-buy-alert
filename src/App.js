import React, { Component } from 'react';
import {Text, View,YellowBox} from 'react-native';

import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import Routers from './Routers';

class App extends Component {
    render(){
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
            'Warning: componentWillUpdate is deprecated',
        ]);
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return(
            <Provider store = {store} >
                <Routers/>
            </Provider>
        );
    }
}
export default App;
