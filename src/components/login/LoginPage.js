import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import LoginForm from './LoginForm'
import Logo from './Logo'

class LoginPage extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Logo/>
                <LoginForm/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255,255,255)'
    }
});
export default LoginPage;