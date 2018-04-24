import React, { Component } from 'react';
import { View, Text,InteractionManager,Alert } from 'react-native';

import firebase from 'react-native-firebase';
import TimerMixin from 'react-timer-mixin';
import geolib from 'geolib';

import TodoList from './TodoList';

class TodoPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lat:'',
            long:'',
            result:'',
            seconds: null
        }
    }

componentDidMount() {
        let query = firebase.database().ref('Location/');
        query.on('value', (snapshot) =>  {
            let location = snapshot.val();
            for(let i = 0; i<location.length; i++) {
                let lat = location[i].lat;
                this.setState({lat: lat, long: location[i].long});
            }
        })
        // this.setTimeInterval();
}
    // setTimeInterval(getMeter) {
    //     TimerMixin.setInterval.call(this, ()=>{
    //         this.getPosition();
    //         if(getMeter < 1500) clearInterval()
    //     },10000);
    // }
    getPosition() {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude)
            const getMeter = geolib.getDistance(position.coords, {
                    latitude: 13.6504129,
                    longitude: 100.294508
                })
                this._onAlert(getMeter);
                this.setTimeInterval(getMeter);
            },
            (error) => console.log(error),
            { enableHighAccuracy: true },   
        );
        return {}
    }
    _onAlert(getMeter) {
        if(getMeter < 1500) {
            Alert.alert(
                'แจ้งเตือน',
                'ใกล้จะถึงสถานที่ของคุณแล้วครับ',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
        }
    }
    render(){
        return(
            <View style={{flex:1}}>
                <TodoList/>
            </View>
        );
    }
}
export default TodoPage;