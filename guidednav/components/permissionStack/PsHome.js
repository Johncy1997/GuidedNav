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
        open:true,
        enableAction: () => {
            AndroidSettings.setMobileData(false);
        },
        openAction: () => {
            AndroidSettings.mobileDataSettings();
        }
    },
    {
        name: "Wifi",
        enable:true,
        open:true,
        enableAction: () => {
            AndroidSettings.setWifiState(true);
        },
        openAction: () => {
            AndroidSettings.wifiSettings();
        }
    },
    {
        name: "Bluetooth",
        enable:true,
        open:true,
        enableAction: () => {
            AndroidSettings.setBluetooth(true);
        },
        openAction: () => {
            AndroidSettings.bluetoothSettings();
        }
    },
    {
        name: "Airplane Mode",
        enable:false,
        open:true,
        enableAction: () => {
            
        },
        openAction: () => {
            AndroidSettings.airplaneModeSettings();
        }
    },
    {
        name: "Location",
        enable:false,
        open:true,
        enableAction: () => {

        },
        openAction: () => {
            AndroidSettings.locationSourceSettings();
        }
    },
    {
        name: "FlashLight",
        enable:true,
        open:false,
        enableAction: () => {
            AndroidSettings.setFlashLight(true);
        },
        openAction: () => {
            
        }
    },
    {
        name: "Data Usage",
        enable:false,
        open:true,
        enableAction: () => {

        },
        openAction: () => {
            AndroidSettings.dataUsageSettings();
        }
    },
    {
        name: "Make a call",
        enable:false,
        open:true,
        enableAction: () => {

        },
        openAction: () => {
            var url = "";
            if (Platform.OS !== 'android') {
                url = `telprompt:${+91-978843634}`;
                }
            else  {
                url = `tel:${+91-9788436349}`;
            }
            Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                    Alert.alert('Not supported');
                  } else {
                    return Linking.openURL(url);
                }
            });
        }
    },
    {
        name: "Data Roaming",
        enable:false,
        open:true,
        enableAction: () => {

        },
        openAction: () => {
            AndroidSettings.mobileDataSettings();
        }
    }
]

export default class PsHome extends Component{

    constructor(props){
        super(props);
    }

    alertUser(item,index){
        const btn = [];
        if(item.enable){
            btn.push({
                text: "Enable",
                onPress: () =>{
                    item.enableAction();
                }
            });
        }
        if(item.open){
            btn.push({
                text: "Open",
                onPress: () => {
                    item.openAction()
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