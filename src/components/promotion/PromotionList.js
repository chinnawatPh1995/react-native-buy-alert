import React, { Component } from 'react'
import {View,ScrollView,
    Text, 
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';

class PromotionList extends Component{
    render(){
        return(
            <ScrollView contentContainerStyle={{flex: 1, backgroundColor:'#fff'}}>


            <ActionButton
                buttonColor="rgb(252, 65, 32)"
                size={40}
                offsetX={20}
                offsetY={20}
                renderIcon ={() => <Icon name="ellipsis-v" size={20} color={'#fff'}/>}
            >
                <ActionButton.Item 
                        buttonColor='rgb(255, 96, 68)' title="Edit" 
                        shadowStyle ={{elevation: 0}}
                        hideLabelShadow
                        size= {35}
                    >
                        <Icon name="edit" size={20} color={'#fff'}/>
                    </ActionButton.Item>
                    <ActionButton.Item 
                        buttonColor='rgb(255, 96, 68)' title="Add" 
                        shadowStyle ={{elevation: 0}}
                        hideLabelShadow
                        size= {35}
                    >
                        <Icon name="plus" size={20} color={'#fff'}/>
                    </ActionButton.Item>
            </ActionButton>
            </ScrollView>
        );
    }
}

export default PromotionList;