import React, { Component } from 'react';
import { View, Text,
    ScrollView
} from 'react-native';
import PromotionList from './PromotionList';
import PromotionForm from './PromotionForm';
import MapMarker from './MapMarker';

class PromotionPage extends Component {
    render(){
        return(
            <MapMarker/>
        );
    }
}
export default PromotionPage;