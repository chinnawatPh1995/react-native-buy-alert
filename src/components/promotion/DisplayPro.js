import React, { Component } from 'react';
import { View,Text,
    TextInput, Image,
    TouchableOpacity,Picker,
    StyleSheet,ScrollView
} from 'react-native';

import firebase from 'react-native-firebase';
import _ from 'lodash';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header,Button } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import {promoChanged } from '../../actions'

import {Styles, Spinner} from '../common';

class DispalyPro extends Component {
    componentDidMount() {
        _.each(this.props.promotion, (value, prop) => {
           this.props.promoChanged({ prop, value });
        });
    }
    render(){
        const {
            promotionName, descriptions,storeName,
            dateS,dateE,image, lat, long
        } = this.props;
        return(
            <ScrollView contentContainerStyle={{flexGrow: 1,backgroundColor:'#fff'}}>
            <Header
                    outerContainerStyles={{ backgroundColor: '#fff' }}
                    leftComponent={
                        <Icon name='arrow-left' size={20} color={'rgb(252, 65, 32)'} onPress={() => Actions.tab2()}/>
                    }
                    centerComponent={{ text: this.props.storeName, style: { fontSize: 18,color: 'rgb(252, 65, 32)' } }}
            />
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <View style={{width:'100%'}}>
                    <Image 
                        source={{uri:image}}
                        style={{height: 400,width:'100%'}}
                    />  
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.textList}>{promotionName}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.dateText}>{dateS}  -</Text>
                        <Text style={styles.dateText}>{dateE}</Text>
                    </View>
                    <Text style={styles.storeName}> {storeName}</Text>
                </View>
                <View style={[styles.containerText,{marginLeft: 10}]}>
                    <Text style={{fontSize: 16}}>
                        {this.props.descriptions}
                    </Text>
                </View>
            </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    containerText:{
        marginTop:10,
        borderBottomColor: 'rgba(0, 0,0,.1)',
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    textList : {
        fontSize: 16,
        marginLeft: 10,
        color: '#000',
        fontWeight: 'bold',
    },
    storeName : {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 5,
        color: "rgb(252, 65, 32)",
    },
    dateText : {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 5,
        color: "rgba(0, 0, 0,.2)",
    },
});

const mapStateToProps = (state) => {
    const {
        promotionName, descriptions,storeName,
        dateS,dateE,image, lat, long
    } = state.promoForm;
    return {
        promotionName, descriptions,
        storeName,dateS,dateE,image, lat, long
    };
}

export default connect(mapStateToProps,{promoChanged})(DispalyPro);