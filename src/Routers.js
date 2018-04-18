import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Router, Scene, Stack, Tabs } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import Login from './components/login/LoginPage';
import Register from './components/register/RegisterPage';
import LoginCheck from './components/login/LoginCheck';
import TodoForm from './components/todo/TodoForm';
import TodoEdit from './components/todo/TodoEdit';

// Tabbar
import TodoPage from './components/todo/TodoPage';
import PromotionPage from './components/promotion/PromotionPage';
import Setting from './components/setting/Setting';

class TabIcon extends Component {
    render() {  
        const color = this.props.focused ? 'rgb(252, 65, 32)' : 'rgba(0,0,0,.3)';
        const size = this.props.focused ? 30 : 28;
        return (
            <View style={{flex:1, alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
                <Icon style={{color:color}} name={this.props.iconName} size={size}/>
                <Text style={{color: color, fontSize: 12}}>{this.props.title}</Text>
            </View>
        );
    }
  }

const Routers = () =>{
    return(
        <Router>
            <Stack key='root'>
                <Scene  key = "loginCheck"
                        component= {LoginCheck}
                        hideNavBar
                        initial
                />
                <Scene
                    key ="login"
                    component={Login}
                    hideNavBar= {true}
                    // initial
                />
                <Scene
                    key = "register"
                    component = {Register}
                    title="สมัครสมาชิก"
                    navigationBarStyle={styles.navbar}
                    titleStyle={styles.titleStyle}
                    rightTitle=" "
                    headerTintColor="#fff"
                    onRight={() => console.log('') }
                />
                <Scene type="replace" key="tabbar"  duration={1}>
                    <Tabs
                        showLabel={false}
                        key="main"
                        tabs={true}
                        tabBarStyle={styles.tabBar}
                        
                        tabBarPosition="bottom"
                    >
                        <Scene  key="tab1" 
                                title="Work"
                                hideNavBar={true} 
                                component={ TodoPage } 
                                initial={true} 
                                iconName="check-circle"
                                icon={TabIcon}
                        />
                        <Scene  key="tab2"
                                title="Promotion"
                                hideNavBar={true}
                                iconName="bullhorn"
                                component={PromotionPage}
                                icon={TabIcon}
                        />
                        <Scene  key="tab3"
                                title="Setting"
                                hideNavBar={true}
                                iconName="gear"
                                component={Setting}
                                icon={TabIcon}
                        />
                    </Tabs>
                </Scene>
                <Scene
                    key = "todoForm"
                    component = {TodoForm}
                    title="สิ่งที่ต้องซื้อ"
                    hideNavBar={false}
                    navigationBarStyle={styles.navbar}
                    titleStyle={styles.titleStyle}
                    rightTitle=" "
                    headerTintColor="#fff"
                    onRight={() => console.log('') }
                />
                <Scene
                    key = "todoEdit"
                    component = {TodoEdit}
                    title="แก้ไข"
                    hideNavBar={false}
                    navigationBarStyle={styles.navbar}
                    titleStyle={styles.titleStyle}
                    rightTitle=" "
                    headerTintColor="#fff"
                    onRight={() => console.log('') }
                />
            </Stack>  
        </Router>
    );
}

const styles = StyleSheet.create({
    navbar : {
        backgroundColor: 'rgb(252, 65, 32)',
        elevation:0.5,
        shadowOpacity: 0,
    },
    titleStyle: {
        color: '#ffffff',
        alignSelf: 'center',
    },
    tabBar: {
        backgroundColor: 'rgb(255, 255, 255)',
        borderTopWidth: 0.2,
        borderTopColor: 'rgba(0,0,0,.1)',
    },
});
export default Routers;