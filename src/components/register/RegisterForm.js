import React, { Component } from 'react';
import { Text, View,
        StyleSheet,
        TextInput, TouchableOpacity,
        Alert       
} from 'react-native';

import { connect } from 'react-redux';
import {Header, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Spinner } from '../common';
import Logo from '../login/Logo';

import {
    emailChanged, passwordChanged,
    reConfirmPassChanged, registerUser
} from '../../actions';
import { Actions } from 'react-native-router-flux';

class RegisterForm extends Component {
    onEmailChange(email) {
        this.props.emailChanged(email);
    }
    onPasswordChange(password) {
        this.props.passwordChanged(password);
    }
    onConfirmPassChange(confirmPass) {
        const {password} = this.props;
        this.props.reConfirmPassChanged(password,confirmPass);
    }
    onPressRegis(){
        const { email , password, errors, confirmPass } = this.props;
        const {reErrros} = this.props;
        if(email != '' && password != '' && confirmPass !='' &&
        errors.password == '' && errors.email == '' && reErrros.confirmPass== ''){
            this.props.registerUser({email, password});
        }else{
            Alert.alert(
                'Warning',
                'Email or password not valid',
                [{text: 'OK'}],
                { cancelable: false }
            )
        }
    }
    renderSpinner() {
        const {loading,email,password} = this.props;
        if(loading) {
            return <Spinner size="large"/>
        }else{
            return <Text style={{marginLeft:5,color: '#f73b3b'}}>{this.props.reErrros.auth}</Text>
        }
    }
    render(){
        const test = {
        }
        const {email, password} = this.props.errors;
        return(
        <View style={{flex: 1}}>
            <Header
                outerContainerStyles={{ backgroundColor: '#fff' }}
                leftComponent={
                    <Icon name='arrow-left' size={20} color={'rgb(252, 65, 32)'} onPress={() => Actions.login()}/>
                }
                centerComponent={{ text: 'สมัครสมาชิก', style: { fontSize: 18,color: 'rgb(252, 65, 32)' } }}
                rightComponent={<Icon name='sign-in' size={30} color={'rgb(252, 65, 32)'} onPress={() => this.onPressRegis()}/>}
            />
           <View style={styles.container}>
                <Logo />
                <View style={styles.cardSection}>
                    <Text style={styles.text}>Email</Text>
                    <View style={styles.inputStyle}>
                        <TextInput
                            placeholder = "Example@email.com"
                            placeholderTextColor= "rgb(123, 123, 124)"
                            autoCorrect = {false}
                            onChangeText = {this.onEmailChange.bind(this)}
                            value = {this.props.email}
                        />
                    </View>
                    <Text style={{marginLeft:5,color: '#f73b3b'}}>{email}</Text>
                </View>
                <View style={styles.cardSection}>
                    <Text style={styles.text}>Password</Text>
                    <View style={styles.inputStyle}>
                        <TextInput
                            placeholder = "More than 8 charactor"
                            placeholderTextColor= "rgb(123, 123, 124)"
                            secureTextEntry
                            onChangeText= {this.onPasswordChange.bind(this)}
                            value = {this.props.password}
                        />
                    </View>
                    <Text style={{marginLeft:5,color: '#f73b3b'}}>{password}</Text>
                </View>
                <View style={styles.cardSection}>
                    <Text style={styles.text}>Confirm Password</Text>
                    <View style={styles.inputStyle}>
                        <TextInput
                            placeholder = "More than 8 charactor"
                            placeholderTextColor= "rgb(123, 123, 124)"
                            secureTextEntry
                            onChangeText = {this.onConfirmPassChange.bind(this)}
                            value = {this.props.confirmPass}
                        />
                    </View>
                    <Text style={{marginLeft:5,color: '#f73b3b'}}>{this.props.reErrros.confirmPass}</Text>
                </View>
                {this.renderSpinner()}
           </View>
        </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: '10%',
        backgroundColor: '#fff',
        flex: 1,
    },
    cardSection: {
        width: '80%',
        marginBottom: 10,
    },
    text: {
        fontWeight: '600',
        fontSize: 16,
        color: 'rgb(252, 65, 32)'
    },
    inputStyle: {
        borderColor: 'rgba(0,0,0,0.1)',
    },
    touch: {
        width: '30%',
        alignItems: 'center',
        backgroundColor: 'rgb(252, 65, 32)',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgb(252, 65, 32)',
        marginTop: 10,
        marginRight: 15,
    },
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
});

const mapStateToProps = ({register,auth}) => {
    const {email, password, errors} = auth;
    const { confirmPass, reErrros, loading } = register;
    return { email , password, errors,
            confirmPass, reErrros, loading} ;
}

export default connect(mapStateToProps, {
    emailChanged, passwordChanged,
    reConfirmPassChanged, registerUser
})(RegisterForm);