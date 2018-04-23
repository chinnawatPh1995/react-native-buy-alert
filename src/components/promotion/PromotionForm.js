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
import { Header } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import DateTimePicker from 'react-native-modal-datetime-picker';

import {Styles, Spinner} from '../common';
import ImgPicker from '../../api/ImgPicker';
import {promoChanged, promotionAdd} from '../../actions';

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
            loading: null,
            isDateTimePickerVisible: false,
            dateCheck: '',
        }
    } 
    // Up load image to firebase
    uploadImg({uri,fileName}){
        const imgName = fileName;
        const image = uri;     
        const sessionId = new Date().getTime()
        const res = sessionId+imgName;
        const imageRef = firebase.storage().ref('images').child(res);
        let mime = 'image/jpg';
        imageRef.put(image, { contentType: mime })
            .then(() => {
              return imageRef.getDownloadURL()
            })
            .then((url) => {
                this.props.promoChanged({prop : 'image', value: url});
                this.setState({loading: false});
            })
            .catch((error) => {
              console.log(error);
          })
    }
    onPressLibrary(){
        ImagePicker.launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                }else {
                    this.loadingSP(this.setState({loading: true}));     
                    const { fileName , uri } = response;
                    this.uploadImg({uri,fileName})
                }
        });
    }
    // Date picker 
        //date start
        _dateSPicker = () => this.setState({isDateTimePickerVisible: true, dateCheck: 'dateS'});
        // date end
        _dateEPicker = () => this.setState({isDateTimePickerVisible: true, dateCheck: 'dateE'});
        //close date picker
        _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

        _handleDatePicked = (date) => { 
            const t = date.toString();
            const success = t.slice(3,15);
            if(this.state.dateCheck == 'dateS'){
                this.props.promoChanged({prop: 'dateS' , value: success})
            }else if(this.state.dateCheck == 'dateE'){
                this.props.promoChanged({prop: 'dateE' , value: success})
            }else{
                this.setState({dateCheck: ''});
            }
            this._hideDateTimePicker();
        }
    // launch spinner
    loadingSP() {
        if(this.state.loading){
            return(
                <Spinner size="large"/>
            );
        }else if(this.state.loading == false){
            return(
                <View style={{width: '35%'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image 
                            source={{uri:this.props.image}}
                            style={{height: 90,width:120}}
                        />
                        </View>
                </View>
            )
        }else {
            <View></View>
        }
    }

    onSubmit(){
        const { promotionName, descriptions, storeName,dateS,dateE,image} = this.props;
        this.props.promotionAdd({promotionName, descriptions, storeName,dateS,dateE,image});
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
                    {this.loadingSP()}
                    <TouchableOpacity 
                        onPress={this.onPressLibrary.bind(this)}
                        style={{width: '30%'}}
                    >
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
                        <TouchableOpacity onPress={this._dateSPicker.bind(this)}>
                            <View pointerEvents='none'>
                                <TextInput 
                                    editable={false}
                                    placeholder="วันที่เริ่มต้น"
                                    placeholderTextColor= "rgb(123, 123, 124)"
                                    underlineColorAndroid="rgba(123, 123, 124,.7)"
                                    autoCorrect = {false}
                                    style = {{fontSize: 16}}
                                    value= {this.props.dateS}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={Styles.sectionRow}>
                    <View style={{width: '15%', justifyContent: 'center'}}>
                        <Icon name='calendar' size={22} color={'rgb(252, 65, 32)'} style={{alignSelf:'center'}} />
                    </View>
                    <View style={{width: '85%'}}>
                    <TouchableOpacity onPress={this._dateEPicker.bind(this)}>
                            <View pointerEvents='none'>
                                <TextInput 
                                    editable={false}
                                    placeholder="วันที่สิ้นสุด"
                                    placeholderTextColor= "rgb(123, 123, 124)"
                                    underlineColorAndroid="rgba(123, 123, 124,.7)"
                                    autoCorrect = {false}
                                    style = {{fontSize: 16}}
                                    value= {this.props.dateE}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={Styles.sectionRow}>
                    <View style={{width: '15%', justifyContent: 'center'}}>
                        <Icon name='map-marker' size={25} color={'rgb(252, 65, 32)'} style={{alignSelf:'center'}} />
                    </View>
                    <View style={{width: '85%'}}>
                    <TouchableOpacity onPress={this._dateEPicker.bind(this)}>
                            <View pointerEvents='none'>
                                <TextInput 
                                    editable={false}
                                    placeholder="สถานที่"
                                    placeholderTextColor= "rgb(123, 123, 124)"
                                    underlineColorAndroid="rgba(123, 123, 124,.7)"
                                    autoCorrect = {false}
                                    style = {{fontSize: 16}}
                                    value= {this.props.dateE}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    is24Hour
                />
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
    const {
        promotionName, descriptions,storeName,
        dateS,dateE,image, lat, long
    } = state.promoForm;
    return {
        promotionName, descriptions,
        storeName,dateS,dateE,image, lat, long
    };
}

export default connect(mapStateToProps,{
    promoChanged,promotionAdd
})(PromotionForm);