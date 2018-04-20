import React, { Component } from 'react';
import { View,Text,
    TextInput, Image,
    TouchableOpacity,Picker,
    StyleSheet
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

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
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
      
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
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
        
        let img = this.state.picture === null? null:
            <Image 
                source={this.state.picture}
                style={{height: 200,width:200}}
            />

        return(
            <View style={Styles.container}>
                <View style={[Styles.sectionRow,{borderBottomWidth:0.5}]}>
                    <View style={{width: '15%', justifyContent: 'center'}}>
                        <Icon name='md-create' size={35} color={'rgb(252, 65, 32)'} style={{alignSelf:'center'}} />
                    </View>
                    <View style={{width: '85%'}}>
                        <TextInput
                            placeholder="ชื่อร้านค้า"
                            placeholderTextColor= "rgb(123, 123, 124)"
                            autoCorrect = {false}
                            style = {{fontSize: 16}}
                            onChangeText = {title => this.props.promoChanged({prop: 'title', value: title})}
                            value= {this.props.title}
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
                        <Icon name='ios-calendar' size={35} color={'rgb(252, 65, 32)'} style={{alignSelf:'center'}} />
                    </View>
                    <View style={{width: '85%'}}>
                        <TextInput
                            placeholder="วันที่เริ่ม"
                            placeholderTextColor= "rgb(123, 123, 124)"
                            autoCorrect = {false}
                            style = {{fontSize: 16}}
                            onChangeText = {title => this.props.promoChanged({prop: 'title', value: title})}
                            value= {this.props.title}
                        />
                    </View>
                </View>
                <View style={Styles.sectionRow}>
                    <View style={{width: '15%', justifyContent: 'center'}}>
                        <Icon name='ios-calendar' size={35} color={'rgb(252, 65, 32)'} style={{alignSelf:'center'}} />
                    </View>
                    <View style={{width: '85%'}}>
                        <TextInput
                            placeholder="วันที่สิ้นสุด"
                            placeholderTextColor= "rgb(123, 123, 124)"
                            autoCorrect = {false}
                            style = {{fontSize: 16}}
                            onChangeText = {title => this.props.promoChanged({prop: 'title', value: title})}
                            value= {this.props.title}
                        />
                    </View>
                </View>
                {img}
                <TouchableOpacity
                    style = {styles.touch}
                    onPress={this.getImage.bind(this)}
                >
                    <Text style={styles.textStyle}>แทรกรูปภาพ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                        style = {styles.touch}
                        onPress={this.onSubmit.bind(this)}
                    >
                        <Text style={styles.textStyle}>บันทึก</Text>
                </TouchableOpacity>
            </View>
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
    const {title, descriptions} = state.promoForm;
    return { title, descriptions };
}

export default connect(mapStateToProps,{
    promoChanged
})(PromotionForm);