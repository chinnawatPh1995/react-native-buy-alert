import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

class TodoPage extends Component {
    render(){
        return(
            <View style={{flex:1}}>
                <TodoList/>
            </View>
        );
    }
}
export default TodoPage;