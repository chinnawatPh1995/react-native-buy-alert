import React, { Component } from 'react';
import { View, Text,
    ScrollView
} from 'react-native';
import PromotionList from './PromotionList';
import PromotionForm from './PromotionForm';

class PromotionPage extends Component {
    render(){
        return(
            <PromotionForm/>
        );
    }
}
export default PromotionPage;