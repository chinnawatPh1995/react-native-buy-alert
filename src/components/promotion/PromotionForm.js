import React, { Component } from 'react';
import { View,Text,
    TextInput, Image,
    TouchableOpacity,Picker,
    StyleSheet,ScrollView
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

import {Styles} from '../common';
import ImgPicker from '../../api/ImgPicker';
import {promoChanged} from '../../actions';

let options = {
    title: 'เลือกรูปภาพ',
    // customButtons: [
    //   {name: 'fb', title: 'Choose Photo from Facebook'},
    // ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
};

class PromotionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: null
        }
    }    
    getImage(){
        ImagePicker.launchImageLibrary(options, (response) => {      
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }else {
                let source = {uri: response.uri };
                this.props.todoChanged({prop: 'image', value: source})
            }
          });
    }

    onSubmit(){
        const { work , descriptions, categories} = this.props;
        this.props.todoAdd({work, descriptions, categories});
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{flex: 1}}>
            <Header
                    outerContainerStyles={{ backgroundColor: '#fff' }}
                    leftComponent={
                        <Icon name='arrow-left' size={20} color={'rgb(252, 65, 32)'} onPress={() => Actions.main()}/>
                    }
                    centerComponent={{ text: 'เพิ่มโปรโมชั่น', style: { fontSize: 18,color: 'rgb(252, 65, 32)' } }}
                    rightComponent={<Icon name='check' size={25} color={'rgb(252, 65, 32)'} onPress={this.onSubmit.bind(this)} />}
            />
            <View style={Styles.container}>
                <View style={Styles.sectionRow}>
                    <View style={{width: '35%'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Image
                                style={{height: 90,width:90}}
                                source={require('../../img/logo.png')}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={{width: '35%'}}>
                        <View style={{width: '100%'}}>
                            <Icon name='image' size={100} color={'rgb(209, 209, 209)'} style={{alignSelf:'center'}} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[Styles.sectionRow,{borderBottomWidth:0.5}]}>
                    <View style={{width: '15%', justifyContent: 'center'}}>
                        <Icon name='pencil' size={22} color={'rgb(252, 65, 32)'} style={{alignSelf:'center'}} />
                    </View>
                    <View style={{width: '85%'}}>
                        <TextInput
                            placeholder="โปรโมชั่น"
                            placeholderTextColor= "rgb(123, 123, 124)"
                            autoCorrect = {false}
                            style = {{fontSize: 16}}
                            underlineColorAndroid="rgba(123, 123, 124,.7)"
                            onChangeText = {promotionName => this.props.promoChanged({prop: 'promotionName', value: promotionName})}
                            value= {this.props.promotionName}
                        />
                    </View>
                </View>
                <View style={Styles.section}>
                    <TextInput
                        placeholder="รายละเอียด"
                        multiline= {true}
                        numberOfLines = {7}
                        style = {{fontSize: 16}}
                        placeholderTextColor= "rgb(123, 123, 124)"
                        autoCorrect = {false}
                        onChangeText = {descriptions => this.props.promoChanged({prop: 'descriptions', value: descriptions})}
                        value= {this.props.descriptions}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={Styles.sectionRow}>
                    <View style={{width: '15%', justifyContent: 'center'}}>
                        <Icon name='home' size={25} color={'rgb(252, 65, 32)'} style={{alignSelf:'center'}} />
                    </View>
                    <View style={{width: '85%'}}>
                        <TextInput
                            placeholder="ชื่อร้านค้า"
                            placeholderTextColor= "rgb(123, 123, 124)"
                            underlineColorAndroid="rgba(123, 123, 124,.7)"
                            autoCorrect = {false}
                            style = {{fontSize: 16}}
                            onChangeText = {storeName => this.props.promoChanged({prop: 'storeName', value: storeName})}
                            value= {this.props.storeName}
                        />
                    </View>
                </View>
                <View style={Styles.sectionRow}>
                    <View style={{width: '15%', justifyContent: 'center'}}>
                        <Icon name='calendar' size={22} color={'rgb(252, 65, 32)'} style={{alignSelf:'center'}} />
                    </View>
                    <View style={{width: '85%'}}>
                        <TextInput
                            placeholder="วันที่เริ่ม"
                            placeholderTextColor= "rgb(123, 123, 124)"
                            underlineColorAndroid="rgba(123, 123, 124,.7)"
                            autoCorrect = {false}
                            style = {{fontSize: 16}}
                            onChangeText = {dateS => this.props.promoChanged({prop: 'dateS', value: dateS})}
                            value= {this.props.dateS}
                        />
                    </View>
                </View>
                <View style={Styles.sectionRow}>
                    <View style={{width: '15%', justifyContent: 'center'}}>
                        <Icon name='calendar' size={22} color={'rgb(252, 65, 32)'} style={{alignSelf:'center'}} />
                    </View>
                    <View style={{width: '85%'}}>
                        <TextInput
                            placeholder="วันที่สิ้นสุด"
                            placeholderTextColor= "rgb(123, 123, 124)"
                            underlineColorAndroid="rgba(123, 123, 124,.7)"
                            autoCorrect = {false}
                            style = {{fontSize: 16}}
                            onChangeText = {dateE => this.props.promoChanged({prop: 'dateE', value: dateE})}
                            value= {this.props.dateE}
                        />
                    </View>
                </View>
            </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
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
});

const mapStateToProps = (state) => {
    const {promotionName, descriptions, storeName,dateS,dateE} = state.promoForm;
    return { promotionName, descriptions, storeName,dateS,dateE };
}

export default connect(mapStateToProps,{
    promoChanged
})(PromotionForm);