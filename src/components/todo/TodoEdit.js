import _ from 'lodash';
import React, { Component } from 'react';
import { View,Text,
    TextInput, Image,
    TouchableOpacity,Picker,TouchableHighlight,
    StyleSheet,ScrollView
} from 'react-native';

import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import {Header, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';

import {Styles} from '../common';
import {todoSaveChanged, todoChanged, todoDelected,todoClearState} from '../../actions';
import {Spinner} from '../common';

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

class TodoEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: null,
            fileName: '',
        }
    } 
    componentDidMount() {
        _.each(this.props.todo, (value, prop) => {
           this.props.todoChanged({ prop, value });
        });
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
                this.setState({loading: false});
            })
            .catch((error) => {
              console.log(error);
          })
    }
    onPressCamera(){
        ImagePicker.launchCamera(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                }else {
                    this.loadingSP(this.setState({loading: true}));     
                    const { fileName , uri } = response;
                    this.uploadImg({uri,fileName})
                }
        });
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

    loadingSP() {
        if(this.state.loading == null){
            return(
                <Image 
                    source={{uri:this.props.image}}
                    style={{height: 300,width:300}}
                />
            )
        }else if(this.state.loading == true){
            return(
                <Spinner size="large"/>
            );
        }else {
            return(
                <Image 
                    source={{uri:this.props.image}}
                    style={{height: 300,width:300}}
                />
            )
        }
    }

    onSubmit(){
        const { work , descriptions, categories,image} = this.props;
        this.props.todoSaveChanged({work, descriptions, categories,image, uid: this.props.todo.uid});
    }

    onPressDelect() {
        const { work , descriptions, categories,image} = this.props;
        this.props.todoDelected({work, descriptions, categories,image, uid: this.props.todo.uid});
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{flex: 1}}>
                <Header
                    outerContainerStyles={{ backgroundColor: '#fff' }}
                    leftComponent={
                        <Icon name='arrow-left' size={20} color={'rgb(252, 65, 32)'} onPress={() => this.props.todoClearState()}/>
                    }
                    centerComponent={{ text: 'แก้ไข', style: { fontSize: 18,color: 'rgb(252, 65, 32)' } }}
                    rightComponent={<Icon name='check' size={25} color={'rgb(252, 65, 32)'} onPress={this.onSubmit.bind(this)} />}
                />
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
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    {this.loadingSP()}
                </View>                
                </View>
                
                <ActionButton
                    buttonColor="rgba(0,0,0,0)"
                    size={40}
                    position="left"
                    offsetX={10}
                    offsetY={10}
                    renderIcon={() => <Icon name="plus-square" size={35} color={'rgb(252, 65, 32)'} />}
                >
                    <ActionButton.Item 
                        buttonColor='rgb(255, 96, 68)' title="Camera" 
                        onPress={this.onPressCamera.bind(this)}
                        shadowStyle ={{elevation: 0}}
                        hideLabelShadow
                    >
                        <Icon name="camera" color={'#fff'} size={20}/>
                    </ActionButton.Item>
                    <ActionButton.Item 
                        buttonColor='rgb(255, 96, 68)' title="Gallery" 
                        shadowStyle ={{elevation: 0}}
                        hideLabelShadow
                        onPress={this.onPressLibrary.bind(this)}
                    >
                        <Icon name="image" color={'#fff'} size={20}/>
                    </ActionButton.Item>
                </ActionButton>

                <ActionButton
                    buttonColor="transparent"
                    position="center"
                    renderIcon={() => <Icon name="trash" size={30} color={'rgb(252, 65, 32)'}/>}
                    offsetY={7}
                    onPress={this.onPressDelect.bind(this)}
                />

                <ActionButton
                    buttonColor="rgba(0,0,0,0)"
                    size={55}
                    offsetX={5}
                    offsetY={3}
                    renderIcon={() => <Icon name="chevron-circle-up" size={40}  color={'rgb(252, 65, 32)'}/>}
                >
                    <ActionButton.Item 
                        buttonColor='rgb(255, 96, 68)' title="Share" 
                        onPress={() => console.log("notes tapped!")}
                        shadowStyle ={{elevation: 0}}
                        hideLabelShadow
                        size={40}
                    >
                        <Icon name="share" color={'#fff'} size={20}/>
                    </ActionButton.Item>
                </ActionButton>

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
    const {work, descriptions, categories, image} = state.todoForm;
    return { work, descriptions, categories, image};
}

export default connect(mapStateToProps,{
    todoChanged,todoSaveChanged, todoDelected,todoClearState
})(TodoEdit);