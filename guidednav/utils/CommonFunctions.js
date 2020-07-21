import {
    PixelRatio,
    Dimensions
} from 'react-native';
import Tts from 'react-native-tts';
import Toast from 'react-native-view-toast';

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