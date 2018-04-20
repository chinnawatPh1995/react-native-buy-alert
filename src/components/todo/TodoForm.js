import React, { Component } from 'react';
import { View,Text,
    TextInput, Image,
    TouchableOpacity,Picker,
    StyleSheet
} from 'react-native';

import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';

import {Styles} from '../common';
import ImgPicker from '../../api/ImgPicker';
import {todoChanged, todoAdd} from '../../actions';

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


class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: null
        }
    } 
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
                this.props.todoChanged({prop : 'image', value: url});
            })
            .catch((error) => {
              console.log(error);
          })
    }   
    getImage(){
        ImagePicker.showImagePicker(options, (response) => {
                const { fileName , uri } = response;
                this.uploadImg({uri,fileName});
        });
    }

    onSubmit(){
        const { work , descriptions, categories} = this.props;
        const  img  = this.props.image;
        this.props.todoAdd({work, descriptions, categories, img});
    }

    render(){
        let img = this.props.image === null? null:
            <Image 
                source={{uri:this.props.image}}
                style={{height: 200,width:200}}
            />
        return(
            <View style={Styles.container}>
                <View style={[Styles.section,{marginTop:20}]}>
                    <TextInput
                        placeholder="สินค้าที่คุณต้องการซื้อ"
                        placeholderTextColor= "rgb(123, 123, 124)"
                        autoCorrect = {false}
                        style = {{fontSize: 16}}
                        onChangeText = {work => this.props.todoChanged({prop: 'work', value: work})}
                        value= {this.props.work}
                    />
                </View>
                <View style={{marginTop:15, width: '90%',}}>
                <Text style={{fontSize: 16}}>หมวดหมูสินค้า</Text>
                    <Picker
                        mode="dropdown"
                        selectedValue={this.props.categories}
                        onValueChange={categories=> this.props.todoChanged({prop: 'categories', value: categories})}
                    >   
                        <Picker.Item label="เลือก" value=""/>
                        <Picker.Item label="ชุดเครื่องแต่งกาย" value="ชุดเครื่องแต่งกาย"/>
                        <Picker.Item label="กีฬา" value="กีฬา"/>
                        <Picker.Item label="เครื่องประดับ" value="เครื่องประดับ"/>
                        <Picker.Item label="ไอที" value="ไอที"/>
                        <Picker.Item label="เครื่องสำอาง" value="เครื่องสำอาง"/>
                        <Picker.Item label="สำหรับเด็ก" value="สำหรับเด็ก"/>
                        <Picker.Item label="บ้าน" value="บ้าน"/>
                        <Picker.Item label="อาหาร" value="อาหาร"/>
                        <Picker.Item label="ไลฟ์สไตล์" value="ไลฟ์สไตล์"/>
                    </Picker>
                </View>
                <View style={Styles.section}>
                    <TextInput
                        placeholder="รายละเอียด"
                        multiline= {true}
                        style = {{fontSize: 16}}
                        placeholderTextColor= "rgb(123, 123, 124)"
                        autoCorrect = {false}
                        onChangeText = {descriptions => this.props.todoChanged({prop: 'descriptions', value: descriptions})}
                        value= {this.props.descriptions}
                        underlineColorAndroid="transparent"
                    />
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
    const {work, descriptions, categories, image} = state.todoForm;
    return { work, descriptions, categories, image };
}

export default connect(mapStateToProps,{
    todoChanged,todoAdd
})(TodoForm);