import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

export default class Help extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{flex:1}}>
                <Text>Help</Text>
            </View>
        )
    }
}