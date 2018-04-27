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
        const { currentUser } = firebase.auth();
        const todos = firebase.database().ref(`/todos/${currentUser.uid}/todolist`);
        todos.on('value', (snapshot) => {
            const obj = snapshot.val();
            let result = [];
            if(obj != null) {
                Object.keys(obj).map((keys)=>{
                 this.queryLocation(obj[keys].categories);
             })
            }
        })
        // this.setTimeInterval();
}
    queryLocation = (categories) => {
        const checkCate = null;
        let query = firebase.database().ref('Location/');
        query.on('value', (snapshot) =>  {
            let location = snapshot.val();
            for(let i = 0; i<location.length; i++) {
                let category = location[i].category;
                if(category.includes(categories)) this.getLocation(location[i].lat, location[i].long);
            }
        })
    }
    getLocation = (lat,long) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const getMeter = geolib.getDistance(position.coords, {
                    latitude: lat,
                    longitude: long
                })
                this._onAlert(getMeter);
            },
            (error) => console.log(error),
            { enableHighAccuracy: true },   
        );
    }
    // setTimeInterval(getMeter) {
    //     TimerMixin.setInterval.call(this, ()=>{
    //         this.getPosition();
    //         if(getMeter < 1500) clearInterval()
    //     },10000);
    // }
    _onAlert(getMeter) {
        if(getMeter < 1500) {
            Alert.alert(
                'แจ้งเตือน',
                'ใกล้จะถึงสถานที่ของคุณแล้วครับ',
                [
                  {text: 'OK', onPress: () => this._onTest()},
                ],
                { cancelable: false }
            )
        }
    }
    _onTest() {
        console.log('OK Pressed')
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