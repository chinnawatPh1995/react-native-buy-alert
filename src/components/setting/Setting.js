import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';

class Setting extends Component {
    onPresslogOut= () => {
        firebase.auth().signOut().then(() => {
                Actions.loginCheck();
          }).catch(function(error) {
                console.log(error)
          });
    }
    render(){
        return(
            <Button
                icon={
                    <Icon
                    name='arrow-left'
                    size={15}
                    color='white'
                    />
                }
                iconLeft
                title='Log Out'
                onPress = {() => this.onPresslogOut()}
            />
        );
    }
}
export default Setting;