import _ from 'lodash';
import React, { Component } from 'react';
import {
    Text, View, StyleSheet,Alert,
    FlatList,ListView,ScrollView,
    TouchableHighlight,TouchableWithoutFeedback 
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import ActionButton from 'react-native-action-button';

import { Styles } from '../common';
import {todoFetch} from '../../actions';


class TodoList extends Component {
    componentDidMount() {
        this.props.todoFetch();
    }

    onRenderItem = (item) => {
        Actions.todoEdit({todo : item});
    }

    renderRow(item) {
        return (
            <TouchableWithoutFeedback onPress={() => this.onRenderItem(item)}
                onLongPress={this.onPressLongAlert}
            >
                <View style={styles.listViewStyle}>
                    <Icon name='plus' size={20} style={{marginLeft:20}} />
                    <Text style={styles.textList}>{item.work}</Text>
                </View>
            </TouchableWithoutFeedback>
          );
      }
    render(){
        return(
            <View style={Styles.container}>
                <View style={{flexDirection: 'row'}}>
                        <FlatList
                            key= 'listView'
                            data={this.props.todo}
                            renderItem={({item}) => this.renderRow(item)}
                            keyExtractor={(item, index) => item.uid}
                        />
                </View>
                <ActionButton
                    buttonColor="rgb(252, 65, 32)"
                    size={40}
                    onPress={() => Actions.todoForm()}
                    offsetX={20}
                    offsetY={20}
                />
                
            </View>
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
    const todo = _.map(state.todo, (val, uid) => {
        return { ...val, uid };
    });
    return { todo };
};

export default connect(mapStateToProps,{todoFetch})(TodoList);