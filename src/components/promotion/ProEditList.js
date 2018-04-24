import React, { Component } from 'react'
import {View,ScrollView,TouchableWithoutFeedback,
    Text, StyleSheet,FlatList,Image
} from 'react-native';

import {Styles} from '../common'
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';

import {promotionFetch} from '../../actions';

class ProEditList extends Component{
    componentDidMount() {
        this.props.promotionFetch();
    }

    onRenderItem = (item) => {
        Actions.promotionEdit({promotion : item});
    }

    renderRow = (item) => {
        return (
            <TouchableWithoutFeedback onPress={() => this.onRenderItem(item)}
                onLongPress={this.onPressLongAlert}
            >
                <View style={styles.listViewStyle}>
                    <Image 
                        source={{uri:item.image}}
                        style={{height: 90,width:130, borderRadius:3}}
                    />
                    <View>
                        <Text style={styles.textList}>{item.promotionName}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.dateText}>{item.dateS} - </Text>
                            <Text style={styles.dateText}>{item.dateE}</Text>
                        </View>
                        <Text style={styles.storeName}> {item.storeName}</Text>
                    </View>
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
        marginLeft: 10,
        color: '#000',
        fontWeight: 'bold',
    },
    storeName : {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 5,
        color: "rgb(252, 65, 32)",
    },
    dateText : {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 5,
        color: "rgba(0, 0, 0,.2)",
    },
});

const mapStateToProps = state => {
    const promotion = _.map(state.promotionFetch, (val, uid) =>{
        return {...val, uid };
    });
    return {promotion}
}
export default connect(mapStateToProps,{promotionFetch})(ProEditList);