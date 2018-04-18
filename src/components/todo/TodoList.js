import _ from 'lodash';
import React, { Component } from 'react';
import {Text, View, StyleSheet,
    FlatList,ListView,
    TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';

import { BtnCircle } from '../common';
import {todoFetch} from '../../actions';
import ListItem from './ListItem';

class TodoList extends Component {
    onButtonTodo() {
        Actions.todoForm();
    }

    componentDidMount() {
        this.props.todoFetch();
    }
    renderRow(todo) {
        return (
              <Text>
                {this.props.todo.work}
              </Text>
          );
      }
    render(){
        console.log(this.props.todo);
        return(
            <View
                style={{backgroundColor: '#fff',flex: 1}}
            >
                <FlatList
                    data={this.props.todo}
                    renderItem={({item}) => <Text>{item.work}</Text>}
                />
                <TouchableHighlight
                    style={styles.btnStyle}
                    onPress={this.onButtonTodo.bind(this)}
                >
                    <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                        <Icon name="plus" size={20} color={'#fff'} style={{alignSelf: 'center',}}/>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    btnStyle: {
        right: 0,
        bottom: 0,
        marginBottom: 15,
        marginRight: 15,
        borderWidth: 1,
        height: 40,
        width: 40,
        borderRadius: 20,
        borderColor: 'rgb(252, 65, 32)',
        backgroundColor: 'rgb(252, 65, 32)',
        position: 'absolute',
    }
});

const mapStateToProps = state => {
    const todo = _.map(state.todo, (val, uid) => {
        return { ...val, uid };
    });
    return { todo };
};

export default connect(mapStateToProps,{todoFetch})(TodoList);