import {
    PixelRatio,
    Dimensions,
    Platform,
    Linking,
    Alert
} from 'react-native';
import Tts from 'react-native-tts';
import Toast from 'react-native-view-toast';
import AppData from './AppData';
import AndroidSettings from '../components/permissionStack/rnAndroidModule';

export const windowWidth = Dimensions.get('window').width;

export const windowHeight = Dimensions.get('window').height;


export const speakMessage = (message=null) => {
    if(message){
        Tts.speak(message, { androidParams: { KEY_PARAM_PAN: -1, KEY_PARAM_VOLUME: 0.5, KEY_PARAM_STREAM: 'STREAM_MUSIC' } });
    }
}

export const showToaster = (message=null) => {
    if(message){
        Toast.show(message,{
            duration:2000,
            position:heightPercentageToDP('80%'),
            // position:Toast.positions.BOTTOM,
            shadow:true,
            animation:true,
            hideOnPress:true,
            delay:0,
            onShow: () => {
                // calls on toast\`s appear animation start
            },
            onShown: () => {
                // calls on toast\`s appear animation end.
            },
            onHide: () => {
                // calls on toast\`s hide animation start.
            },
            onHidden: () => {
                // calls on toast\`s hide animation end.
            }
        });
    }

}

export const heightPercentageToDP = heightPercent => {
    // Parse string percentage input and convert it to number.
    const elemHeight = parseFloat(heightPercent);
  
    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel(windowHeight * elemHeight / 100);
};


export function getHeader(type='json'){
    var language = AppData.getInstance().getLanguage();
    var header;
    if(type == 'json'){
        header = {
            'Content-Type': 'application/json',
            'MP_LANG': language
        };
    }else if(type == 'multipart'){
        header = {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'MP_LANG': language
        }
    }
    return header;
}

export function handleWithOS(nav_tag){
    switch(nav_tag){
        case 'wifi':
            AndroidSettings.wifiSettings();
            break;
        case 'make_a_call':
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
            break;
        case 'data_usage':
            AndroidSettings.dataUsageSettings();
            break;
        case 'flash_light':
            AndroidSettings.setFlashLight(true);
            break;
        case 'location':
            AndroidSettings.locationSourceSettings();
            break;
        case 'airplane_mode':
            AndroidSettings.airplaneModeSettings();
            break;
        case 'bluetooth':
            AndroidSettings.bluetoothSettings();
            break;
        case 'data_roaming':
            AndroidSettings.mobileDataSettings();
            break;
        case 'mobile_data':
            AndroidSettings.mobileDataSettings();
            break;
        default:
            break;
    }
}