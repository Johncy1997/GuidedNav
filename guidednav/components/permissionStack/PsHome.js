import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    FlatList,
    Linking,
    Platform,
    Alert
} from 'react-native';
import Permissions,{PERMISSIONS, openSettings} from 'react-native-permissions';
import AndroidSettings from './rnAndroidModule';
import {showToaster} from '../../utils/CommonFunctions';

const ANDROIDPERMISSIONS = [
    {
        name: "Mobile Data",
        enable:true,
        open:true
    },
    {
        name: "Wifi",
        enable:true,
        open:true
    },
    {
        name: "Bluetooth",
        enable:true,
        open:true
    },
    {
        name: "Airplane Mode",
        enable:false,
        open:true
    },
    {
        name: "Location",
        enable:false,
        open:true
    },
    {
        name: "FlashLight",
        enable:true,
        open:false
    }
]

export default class PsHome extends Component{

    constructor(props){
        super(props);
    }

    setOptions(optionSelected){
        switch(optionSelected){
            case 0: 
                AndroidSettings.setMobileData(true);
                break;
            case 1: 
                AndroidSettings.setWifiState(true);
                break;
            case 2: 
                AndroidSettings.setBluetooth(true);
                break;
            case 3:
                AndroidSettings.airplaneModeSettings();
                break;
            case 4:
                AndroidSettings.locationSourceSettings();
                break;
            case 5:
                AndroidSettings.setFlashLight(true);
                break;
        }
    }

    openSettings(optionSelected){
        switch(optionSelected){
            case 0: 
                AndroidSettings.mobileDataSettings();
                break;
            case 1: 
                AndroidSettings.wifiSettings();
                break;
            case 2: 
                AndroidSettings.bluetoothSettings();
                break;
            case 3:
                AndroidSettings.airplaneModeSettings();
                break;
            case 4:
                AndroidSettings.locationSourceSettings();
                break;
        }
    }

    alertUser(item,index){
        const btn = [];
        if(item.enable){
            btn.push({
                text: "Enable",
                onPress: () =>{
                    showToaster("Programmatically set");
                    this.setOptions(index)
                }
            });
        }
        if(item.open){
            btn.push({
                text: "Open",
                onPress: () => {
                    showToaster("Manually set");
                    this.openSettings(index);
                }
            });
        }
        Alert.alert("Alert",`Enable"${ANDROIDPERMISSIONS[index].name}"`,btn,
        {
            cancelable: true
        });
    }

    render(){
        return(
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle='dark-content' backgroundColor="white" />
                <View>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }} showsVerticalScrollIndicator={false}>
                        <Text style={{ fontSize: 16, marginTop: 10, color: 'black', fontWeight:'bold' }}>Select Permission to enable:</Text>
                        <FlatList
                            ref={(ref) => { this.flatListRef = ref; }}
                            data={ANDROIDPERMISSIONS}
                            contentContainerStyle={{ marginTop: 10 }}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.alertUser(item,index);
                                        }}
                                        style={[{
                                            flexDirection: 'row', 
                                            justifyContent: 'space-between',
                                            alignItems: 'center', 
                                            paddingTop: 20, 
                                            paddingBottom: 20
                                        }]}
                                    >
                                        <Text ref={(ref) => { this[`${item.name}${index}`] = ref; }}>{index+1}: {item.name}</Text>
                                        <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../assets/rightarrow.png')} />
                                    </TouchableOpacity>
                                )
                            }}
                            keyExtractor={(item, index) => item.name}
                        />
                    </ScrollView>
                </View>
        </SafeAreaView>
        )
    }
}