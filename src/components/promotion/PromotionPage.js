import React, { Component } from 'react';
import { View, Text,
    ScrollView
} from 'react-native';
import PromotionList from './PromotionList';

class PromotionPage extends Component {
    render(){
        return(
                <PromotionList/>
        );
    }
}
export default PromotionPage;