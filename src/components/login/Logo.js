import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const Logo = () => {
        return(
               <Image
                    style={{width:150, height:150, marginBottom:30}}
                    source={require('../../img/logo.png')}
               />
        );
}
export default Logo;