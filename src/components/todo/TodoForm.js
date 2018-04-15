import React, { Component } from 'react';
import { View,Text,
    TextInput, Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import RNFetchBlob from 'react-native-fetch-blob';

import {Styles} from '../common';
import ImgPicker from '../../api/ImgPicker';


class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: null
        }
    }    
    getImage(){
        ImgPicker(source => this.setState({picture: source}));
    }

    render(){
        let img = this.state.picture === null? null:
            <Image 
                source={this.state.picture}
                style={{height: 200,width:200}}
            />
        return(
            <View style={Styles.container}>
                <View style={Styles.section}>
                    <TextInput
                        placeholder="สินค้าที่คุณต้องการซื้อ"
                        placeholderTextColor= "rgb(123, 123, 124)"
                        autoCorrect = {false}
                    />
                </View>
                <View style={Styles.section}>
                    <TextInput
                        placeholder="รายละเอียด"
                        multiline= {true}
                        placeholderTextColor= "rgb(123, 123, 124)"
                        autoCorrect = {false}
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
                        onPress={this.getImage.bind(this)}
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

export default TodoForm;