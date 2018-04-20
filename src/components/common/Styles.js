import React from 'react';
import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff',
    },
    section: {
        width: '90%',
        marginBottom: 5,
    },
    sectionRow: {
        width: '100%',
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderColor: 'rgba(0, 0,0,.1)',
    }
});

export {Styles};