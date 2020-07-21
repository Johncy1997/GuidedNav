import React from 'react';
import {
    TouchableOpacity,
    Image
} from 'react-native';
import {
    createStackNavigator
} from '@react-navigation/stack';
import {
    createDrawerNavigator
} from '@react-navigation/drawer';
import HomeManage from '../components/HomeManage';
import EnterZip from '../components/EnterZip';
import RouteNames from './RouteNames';
import Help from '../components/Help';
import SelectNumber from '../components/SelectNumber';
import ChooseDate from '../components/ChooseDate';
import SelectLastDigits from '../components/SelectLastDigits';

import PsHome from '../components/permissionStack/PsHome';

const Stack = createStackNavigator();

function HomeStack() {
    return (
      <Stack.Navigator
      initialRouteName={RouteNames.HomeStack.home}
      headerMode='float'
      screenOptions= {
        {headerTitleStyle: [
          {
          textAlign:"center", 
          flex:0.8,
          fontWeight:'bold'
        }]}
      }
      headerStyle= {
        {backgroundColor: 'black'}
    }
    headerTitleStyle= {
        {fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',}
    }
    headerTintColor= 'white'
      >
        <Stack.Screen 
        name={RouteNames.HomeStack.home} 
        component={HomeManage} 
        options={({ navigation }) => ({
            title: "Dunking",
        headerLeft: () => (<TouchableOpacity onPress={() => navigation.openDrawer()} style={{ height: 20, width: 40, marginLeft: 10 }}>
            <Image source={require('.././assets/images.png')} style={{ height: '100%', width: '100%', resizeMode: 'contain' }} />
        </TouchableOpacity>),
        headerRight: ()=>(<TouchableOpacity onPress={() => navigation.navigate(RouteNames.HomeStack.help)} style={{ height: 20, width: 40, marginRight: 10 }}>
            <Image source={require('.././assets/ques.png')} style={{ height: '100%', width: '100%', resizeMode: 'contain' }} />
        </TouchableOpacity>)
        })}
        />
        <Stack.Screen 
        name={RouteNames.HomeStack.enterZip} 
        component={EnterZip} 
        options = {({ navigation }) => ({
            title: "Enter Zip",
            headerLeft: () => (<TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 20, width: 40, marginLeft: 10 }}>
            <Image source={require('.././assets/goBack.png')} style={{ height: '100%', width: '100%', resizeMode: 'contain' }} />
        </TouchableOpacity>),
            headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate(RouteNames.HomeStack.help)} style={{ height: 20, width: 40, marginRight: 10 }}>
            <Image source={require('.././assets/ques.png')} style={{ height: '100%', width: '100%', resizeMode: 'contain' }} />
        </TouchableOpacity>)
        })}/>
        <Stack.Screen 
        name={RouteNames.HomeStack.help} 
        component={Help} 
        options = {({ navigation }) => ({
            title: "Help",
            headerLeft: () => (<TouchableOpacity onPress={()=>navigation.goBack()} style={{height:20,width:40,marginLeft:10}}>
            <Image source={require('.././assets/goBack.png')} style={{height:'100%',width:'100%',resizeMode:'contain'}}/>
        </TouchableOpacity>),
            headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate(RouteNames.HomeStack.help)} style={{ height: 20, width: 40, marginRight: 10 }}>
            <Image source={require('.././assets/ques.png')} style={{ height: '100%', width: '100%', resizeMode: 'contain' }} />
        </TouchableOpacity>)})}
        />
        <Stack.Screen 
        name={RouteNames.HomeStack.selectNumber} 
        component={SelectNumber} 
        options = {({ navigation }) => ({
            title: "Select number",
            headerLeft: () => (<TouchableOpacity onPress={()=>navigation.goBack()} style={{height:20,width:40,marginLeft:10}}>
            <Image source={require('.././assets/goBack.png')} style={{height:'100%',width:'100%',resizeMode:'contain'}}/>
        </TouchableOpacity>),
            headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate(RouteNames.HomeStack.help)} style={{ height: 20, width: 40, marginRight: 10 }}>
            <Image source={require('.././assets/ques.png')} style={{ height: '100%', width: '100%', resizeMode: 'contain' }} />
        </TouchableOpacity>)})}
        />
        <Stack.Screen 
        name={RouteNames.HomeStack.chooseDate} 
        component={ChooseDate} 
        options = {({ navigation }) => ({
            title: "Select date",
            headerLeft: () => (<TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 20, width: 40, marginLeft: 10 }}>
                <Image source={require('.././assets/goBack.png')} style={{ height: '100%', width: '100%', resizeMode: 'contain' }} />
            </TouchableOpacity>),
            headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate(RouteNames.HomeStack.help)} style={{ height: 20, width: 40, marginRight: 10 }}>
                <Image source={require('.././assets/ques.png')} style={{ height: '100%', width: '100%', resizeMode: 'contain' }} />
            </TouchableOpacity>)
        })}
        />
        <Stack.Screen 
        name={RouteNames.HomeStack.selectLastFour} 
        component={SelectLastDigits} 
        options = {({ navigation }) => ({
            title: "Select number",
            headerLeft: () => (<TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 20, width: 40, marginLeft: 10 }}>
                <Image source={require('.././assets/goBack.png')} style={{ height: '100%', width: '100%', resizeMode: 'contain' }} />
            </TouchableOpacity>),
            headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate(RouteNames.HomeStack.help)} style={{ height: 20, width: 40, marginRight: 10 }}>
                <Image source={require('.././assets/ques.png')} style={{ height: '100%', width: '100%', resizeMode: 'contain' }} />
            </TouchableOpacity>)
        })}
        />
      </Stack.Navigator>
    );
  }

function PermissionStack(){
    return(
        <Stack.Navigator
      initialRouteName={RouteNames.PermissionStack.psHome}
      headerMode='float'
      screenOptions= {
        {headerTitleStyle: [
          {
          textAlign:"center", 
          flex:0.8,
          fontWeight:'bold'
        }]}
      }
      headerStyle= {
        {backgroundColor: 'black'}
    }
    headerTitleStyle= {
        {fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',}
    }
    headerTintColor= 'white'
      >
        <Stack.Screen 
        name={RouteNames.PermissionStack.psHome} 
        component={PsHome} 
        options={({ navigation }) => ({
            title: "Permissions",
        headerLeft: () => (<TouchableOpacity onPress={() => navigation.openDrawer()} style={{ height: 20, width: 40, marginLeft: 10 }}>
            <Image source={require('.././assets/images.png')} style={{ height: '100%', width: '100%', resizeMode: 'contain' }} />
        </TouchableOpacity>),
        headerRight: ()=>(<TouchableOpacity onPress={() => navigation.navigate(RouteNames.HomeStack.help)} style={{ height: 20, width: 40, marginRight: 10 }}>
            <Image source={require('.././assets/ques.png')} style={{ height: '100%', width: '100%', resizeMode: 'contain' }} />
        </TouchableOpacity>)
        })}
        />
        </Stack.Navigator>
    )
}

const Drawer = createDrawerNavigator();

const MainMenu = () => {
    return(<Drawer.Navigator 
initialRouteName={RouteNames.Drawer.menu2} 
drawerPosition="left"
drawerType='slide'
drawerWidth={250}
drawerContentOptions = {
    {
        activeTintColor: 'red',
        itemsContainerStyle: {
          marginVertical: 0,
        },
        iconContainerStyle: {
          opacity: 1
        }
      }
}
>
<Drawer.Screen name={RouteNames.Drawer.menu1} component={HomeStack} />
<Drawer.Screen name={RouteNames.Drawer.menu2} component={PermissionStack} />
</Drawer.Navigator>)}

const AppContainer = MainMenu;

export default AppContainer;
