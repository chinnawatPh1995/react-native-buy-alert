import React from 'react';
import {Text, View, TouchableHighlight,
        StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BtnCircle = ({ onPress }) => {
    return(
        <TouchableHighlight
            style={styles.btnStyle} onPress={onPress}
        >
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                <Icon name="plus" size={20} color={'#fff'} style={{alignSelf: 'center',}}/>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    btnStyle: {
        right: 0,
        bottom: 0,
        marginBottom: 15,
        marginRight: 15,
        borderWidth: 1,
        height: 40,
        width: 40,
        borderRadius: 20,
        borderColor: 'rgb(252, 65, 32)',
        backgroundColor: 'rgb(252, 65, 32)',
        position: 'absolute',
    },
});
export {BtnCircle};