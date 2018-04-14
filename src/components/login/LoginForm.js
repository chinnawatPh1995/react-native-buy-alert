import React, { Component } from 'react';
import { Text, View, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity,
    Alert } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { emailChanged, passwordChanged, loginUser} from '../../actions';
import { Spinner } from '../common';

class LoginForm extends Component {
    onEmailChange(email) {
        this.props.emailChanged(email);
    }
    onPasswordChange(password) {
        this.props.passwordChanged(password);
        console.log(this.props.passwordChanged(password));
    }
    onPressLogin() {
        const { email , password, errors } = this.props;
        if(email != '' && password != '' &&
        errors.password == '' && errors.email == ''){
            this.props.loginUser({email, password});
        }else{
            Alert.alert(
                'Warning',
                'Email or password not valid',
                [{text: 'OK'}],
                { cancelable: false }
            )
        }
    }
    renderSpinner(){
        const { loading } = this.props;
        if(loading) {
            return <Spinner size= "large"/>
        }else{
            return <Text style={{color: '#f73b3b'}}>{this.props.errors.auth}</Text>
        }
    }
    render(){
        return(
            <View style = {styles.container}>
                    <View style = {styles.inputStyle}>
                        <TextInput
                            placeholder = "Example@email.com"
                            placeholderTextColor= "rgb(123, 123, 124)"
                            autoCorrect = {false}
                            underlineColorAndroid="transparent"
                            style={styles.input}
                            onChangeText={this.onEmailChange.bind(this)}
                            // onChangeText = {(email => this.validatorEP('email', email))}
                            value = {this.props.email}
                        />
                    </View>
                    <Text style={{color: '#f73b3b'}}>{this.props.errors.email}</Text>
                    <View style = {styles.inputStyle}>
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor= "rgb(123, 123, 124)"
                            secureTextEntry
                            underlineColorAndroid="transparent"
                            style={styles.input}
                            onChangeText ={this.onPasswordChange.bind(this)}
                            value = {this.props.password}
                        />
                    </View>
                    <Text style={{color: '#f73b3b'}}>{this.props.errors.password}</Text>
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity
                                style={styles.touch}
                                onPress = {this.onPressLogin.bind(this)}
                        >
                            <Text style={styles.textStyle}>
                                เข้าสู่ระบบ
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{alignItems: 'center',marginTop:10}}>
                    {this.renderSpinner()}
                    </View>
                    <View style = {styles.containerRegis}>
                        <Text
                            style={{fontSize: 16}}
                            onPress={()=> Actions.register()}
                        >
                            สมัครสมาชิก
                        </Text>
                    </View>
                    
            </View>
            );
    }
}
const styles = StyleSheet.create({
    container: {
        width: '80%'
    },
    inputStyle: {
        marginTop:10,
        height:45,
        backgroundColor: 'rgba(227, 228, 229,0.3)',
        paddingLeft: 5,
        borderWidth:2,
        borderRadius:3,
        borderColor: 'rgba(227, 228, 229,0.3)',
    },
    input: {
        fontSize: 16,
        color: 'rgb(68, 68, 68)',
        paddingHorizontal: 5,
    },
    touch: {
        width: '70%',
        alignItems: 'center',
        backgroundColor: 'rgb(252, 65, 32)',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgb(252, 65, 32)',
        marginTop: 10
    },
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    containerRegis : {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: '10%',
    }
    
});

const mapStateToProps = ({auth}) => {
    const {email, password, errors, loading} = auth;
    return {email, password, errors, loading};
};

export default connect(mapStateToProps, 
    {emailChanged, passwordChanged, loginUser}
    )(LoginForm);