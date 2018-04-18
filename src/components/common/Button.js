import React from 'react';
import {Text, View,TouchableOpacity} from 'react-native';

const Button = ({ onPress, children }) => {
    return (
        <TouchableOpacity
            style={styles.touch}
            onPress = {onPress}
        >
            <Text style={styles.textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}
const styles = {
    touch: {
        width: '50%',
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
}
export {Button};