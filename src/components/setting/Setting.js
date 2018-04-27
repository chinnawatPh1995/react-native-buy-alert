import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';

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

class Setting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: 'https://www.derechteben.de/images/app/ben-app-logo.png'
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
                this.setState({url: url});
            })
            .catch((error) => {
              console.log(error);
          })
    }
    onPressCamera(){
        ImagePicker.launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                }else {     
                    const { fileName , uri } = response;
                    this.uploadImg({uri,fileName})
                }
        });
    }  
    onPresslogOut= () => {
        firebase.auth().signOut().then(() => {
                Actions.loginCheck();
          }).catch(function(error) {
                console.log(error)
          });
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor: '#fff', justifyContent:'center', alignItems: 'center'}}>
                <View style={{marginBottom: 20}}>
                    <Avatar
                        xlarge
                        rounded
                        source={{uri: this.state.url}}
                        onPress={() => this.onPressCamera()}
                        activeOpacity={0.7}
                    />
                </View>
                <Button
                    icon={
                        <Icon
                        name='arrow-left'
                        size={15}
                        color='white'
                        />
                    }
                    iconLeft
                    title='Log Out'
                    buttonStyle={{
                        backgroundColor: "rgb(252, 65, 32)",
                        width: 200,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    onPress = {() => this.onPresslogOut()}
                />
            </View>
        );
    }
}
export default Setting;