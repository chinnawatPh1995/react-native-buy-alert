import React, { Component } from 'react';
import {Text,View} from 'react-native';

import {auth} from '../../config/firebase';
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
    componentDidMount= () => {
        
        auth.onAuthStateChanged((user) => {
            console.log(user);
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
            return Actions.main();
          case false:
            return Actions.login();
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