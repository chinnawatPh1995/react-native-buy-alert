import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Router, Scene, Stack, Tabs } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import Login from './components/login/LoginPage';
import Register from './components/register/RegisterPage';
import LoginCheck from './components/login/LoginCheck';
import TodoForm from './components/todo/TodoForm';
import TodoEdit from './components/todo/TodoEdit';
import PromotionList from './components/promotion/PromotionList';
import PromotionForm from './components/promotion/PromotionForm';
import MapMarker from './components/promotion/MapMarker';
import PromotionEdit from './components/promotion/PromotionEdit';
import DisplayPro    from './components/promotion/DisplayPro';
import ProEditList from './components/promotion/ProEditList';

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
            <Stack key='root' >
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
                    hideNavBar
                    headerTintColor="#fff"
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
                                hideNavBar
                                component={ TodoPage } 
                                initial={true} 
                                iconName="check-circle"
                                icon={TabIcon}
                        />
                        <Scene  key="tab2"
                                title="Promotion"
                                hideNavBar
                                iconName="bullhorn"
                                component={PromotionPage}
                                icon={TabIcon}
                        />
                        <Scene  key="tab3"
                                title="User"
                                hideNavBar
                                iconName="user"
                                component={Setting}
                                icon={TabIcon}
                        />
                    </Tabs>
                </Scene>
                <Scene
                    key = "todoForm"
                    component = {TodoForm}
                    hideNavBar
                    rightTitle=" "
                    headerTintColor="#fff"
                    rightTitle={<Icon name="check" size={10}/>}
                    onRight={() => console.log("5555")}
                />
                <Scene
                    key = "todoEdit"
                    component = {TodoEdit}
                    title="แก้ไข"
                    hideNavBar
                    headerTintColor="#fff"
                />
                <Scene
                    key = "promotionForm"
                    component = {PromotionForm}
                    title="แก้ไข"
                    hideNavBar
                    headerTintColor="#fff"
                />
                <Scene
                    key = "mapMarker"
                    component = {MapMarker}
                    hideNavBar
                />
                <Scene
                    key = "promotionEdit"
                    component = {PromotionEdit}
                    hideNavBar
                />
                <Scene
                    key = "displayPro"
                    component = {DisplayPro}
                    hideNavBar
                />
                <Scene
                    key= "proeditlist"
                    component = {ProEditList}
                    title= "รายการ"
                    hideNavBar
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