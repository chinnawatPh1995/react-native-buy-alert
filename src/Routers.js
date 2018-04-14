import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Router, Scene, Stack, Tabs } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import Login from './components/login/LoginPage';
import Register from './components/register/RegisterPage';


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
                <Scene
                    key ="login"
                    component={Login}
                    hideNavBar= {true}
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
                <Scene
                    showLabel={false}
                    key="main"
                    tabs={true}
                    tabBarStyle={styles.tabBar}
                    initial
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
                </Scene>
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
        borderTopWidth: 0,
    },
});
export default Routers;