import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const Spinner = ({size}) => {
    return(
            <ActivityIndicator
                color = "rgb(252, 65, 32)"
                size = {size}
            />
    );
}
export { Spinner };