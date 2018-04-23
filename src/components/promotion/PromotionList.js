import React, { Component } from 'react'
import {View,ScrollView,TouchableWithoutFeedback,
    Text, StyleSheet,FlatList
} from 'react-native';

import {Styles} from '../common'
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';

import {promotionFetch} from '../../actions';

class PromotionList extends Component{
    componentDidMount() {
        this.props.promotionFetch();
    }


    renderRow = (item) => {
        console.log('Items',item);
        return (
            <TouchableWithoutFeedback onPress={() => console.log('5555')}
                onLongPress={this.onPressLongAlert}
            >
                <View style={styles.listViewStyle}>
                    <Icon name='plus' size={20} style={{marginLeft:20}} />
                    <Text style={styles.textList}>{item.promotionName}</Text>
                </View>
            </TouchableWithoutFeedback>
          );
    }

    render(){
        return(
            <ScrollView contentContainerStyle={{flex: 1, backgroundColor:'#fff'}}>
                <View style={Styles.container}>
                <View style={{flexDirection: 'row'}}>
                        <FlatList
                            key= 'listView'
                            data={this.props.promotion}
                            renderItem={({item}) => this.renderRow(item)}
                            keyExtractor={(item, index) => item.uid}
                        />
                </View>
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
                            onPress= {() => Actions.promotionForm()}
                            size= {35}
                        >
                            <Icon name="plus" size={20} color={'#fff'}/>
                        </ActionButton.Item>
                </ActionButton>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    listViewStyle: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '95%',
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 15,
        borderBottomColor: 'rgba(0, 0,0,.1)',
        borderBottomWidth: 1,
    },
    textList : {
        fontSize: 16,
        marginLeft: 30,
        color: '#000'
    }
});

const mapStateToProps = state => {
    const promotion = _.map(state.promotionFetch, (val, uid) =>{
        return {...val, uid };
    });
    return {promotion}
}
export default connect(mapStateToProps,{promotionFetch})(PromotionList);