import React, { Component } from 'react';
import {Text,View} from 'react-native';

import firebase from 'react-native-firebase';
import Logo from './Logo';
import {Spinner} from '../common'
import { Actions } from 'react-native-router-flux';

class LoginCheck extends Component{ 
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: null
        }
    }
   UNSAFE_componentWillMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
            if (user) {
            this.setState({ loggedIn: true });
            } else {
            this.setState({ loggedIn: false });
            }
        });
    }
   renderContent() {
        switch (this.state.loggedIn) {
          case true:
            return Actions.reset('main');
          case false:
            return Actions.reset('login');
          default:
            return <Spinner size="large" />;
        }
      }
    render(){
        return(
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
            }}>
                <Logo
                    style={{marginBottom: 20,}}
                />
               {this.renderContent()}
            </View>
        );
    }
}
export default LoginCheck;