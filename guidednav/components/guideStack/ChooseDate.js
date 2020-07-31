import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    TextInput
} from 'react-native';
import Tts from 'react-native-tts';
import Voice from '@react-native-community/voice';
import { showToaster, speakMessage } from '../../utils/CommonFunctions';
import RouteNames from '../../navigators/RouteNames';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
export default class ChooseDate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: -1,
            speechInProgress:false
        }
        Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
        Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
        Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
    }

    componentDidMount(){
        Tts.addEventListener('tts-start', (event) => this.setState({speechInProgress:true}));
        Tts.addEventListener('tts-finish', (event) => this.setState({speechInProgress:false}));
        Tts.addEventListener('tts-cancel', (event) => this.setState({speechInProgress:false}));
        speakMessage("When would you like to get this activated?");
    }

    onSpeechStartHandler(e) {
        this.setState({
            speechInProgress: true
        })
    }

    onSpeechEndHandler(e) {
        this.setState({
            speechInProgress: false
        }, () => {
            Voice.stop();
        })
    }

    onSpeechResultsHandler(e) {
        this.setState({
            results: e.value
        }, () => {
            var z = this.state.results.filter(function(val) {
                return keywords.indexOf(val.toLowerCase()) != -1;
              });
            var check = z.length;
            if (check) {
                speakMessage("Providing zip code lets you choose from the list of eligible first 6 digits of your number");
            }
        })
    }

    onStartButtonPress(e) {
        Voice.start('en-US', {
            "RECOGNIZER_ENGINE": "GOOGLE",
            "EXTRA_PARTIAL_RESULTS": true
        }).then(onFulfilled => {
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const d = new Date();
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle='dark-content' backgroundColor="white" />
                <View>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }} showsVerticalScrollIndicator={false}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>When should we switch it?</Text>
                        <Text style={{ fontSize: 16, marginTop: 10 }}>Your usage allowance for the remaining cycle will change based one the date you choose</Text>
                        <View
                            style={{
                                height: 5,
                                marginTop: 10,
                                backgroundColor: 'black'
                            }}
                        />
                        <View style={{marginTop:30}}>
                            <View style={{flexDirection:'row',alignItems:'center',paddingBottom:20,borderBottomColor:'grey',borderBottomWidth:1,paddingTop:20}}>
                                <TouchableOpacity 
                                onPress={()=>this.setState({date:0})}
                                style={{height:30,width:30,borderRadius:15,backgroundColor:this.state.date===0?'black':'transparent',
                                    borderColor:'grey',borderWidth:1,marginRight:10}}>

                                </TouchableOpacity>
                                <View>
                                    <Text style={{fontSize:16,color:'black',fontWeight:'800'}}>Today</Text>
                                    <Text style={{fontSize:14,color:'grey',marginTop:5}}>{monthNames[d.getMonth()]} {d.getDate()}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',paddingBottom:20,borderBottomColor:'grey',borderBottomWidth:1,paddingTop:20}}>
                                <TouchableOpacity 
                                onPress={()=>this.setState({date:1})}
                                style={{height:30,width:30,backgroundColor:this.state.date===1?'black':'transparent',borderRadius:15,borderColor:'grey',borderWidth:1,marginRight:10}}>

                                </TouchableOpacity>
                                <View>
                                    <Text style={{fontSize:16,color:'black',fontWeight:'800'}}>Next bill</Text>
                                    <Text style={{fontSize:14,color:'grey',marginTop:5}}>Jan 9 - Feb 8</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',paddingBottom:20,borderBottomColor:'grey',borderBottomWidth:1,paddingTop:20}}>
                                <TouchableOpacity 
                                onPress={()=>this.setState({date:2})}
                                style={{height:30,width:30,borderRadius:15,backgroundColor:this.state.date===2?'black':'transparent',borderColor:'grey',borderWidth:1,marginRight:10}}>

                                </TouchableOpacity>
                                <View>
                                    <Text style={{fontSize:16,color:'black',fontWeight:'800'}}>Pick a date</Text>
                                    <Text style={{fontSize:14,color:'grey',marginTop:5}}>Within 30 days from today</Text>
                                </View>
                            </View>
                        </View>
                        {
                            this.state.date!=-1 ? <TouchableOpacity
                                onPress={() => {
                                    speakMessage("You number will be deactivated immediately, restart your device for your new number to be activated.");
                                    this.props.navigation.popToTop(RouteNames.HomeStack.selectNumber, { date: this.state.date });}}
                                style={{
                                    height: 50, backgroundColor: 'black', borderRadius: 25,
                                    justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: 160,
                                    marginTop: 40
                                }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Next</Text>
                            </TouchableOpacity> : null
                        }
                    </ScrollView>
                </View>
                <TouchableOpacity 
                onPress={() => {
                    this.onStartButtonPress();
                }}
                disabled={this.state.speechInProgress}
                style={{ position: 'absolute', bottom: 10, right: 10, }}>
                    <Image style={{ height: 40, width: 40, resizeMode: 'contain', tintColor: this.state.speechInProgress ? 'blue' : 'black' }} source={require('../../assets/record.png')} />
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}