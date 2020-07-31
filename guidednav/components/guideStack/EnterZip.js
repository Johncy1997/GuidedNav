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
import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';
import { showToaster, speakMessage } from '../../utils/CommonFunctions';
import RouteNames from '../../navigators/RouteNames';

const keywords = ["why do you need zip code for", "why", "why you need zip code"];
export default class EnterZip extends Component {

    constructor(props) {
        super(props);
        this.state = {
            zipCode: "",
            speechInProgress: false,
            results: [],
            highlight: true
        }
        Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
        Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
        Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
    }

    componentDidMount() {
        Tts.addEventListener('tts-start', (event) => this.setState({ speechInProgress: true }));
        Tts.addEventListener('tts-finish', (event) => this.setState({ speechInProgress: false }));
        Tts.addEventListener('tts-cancel', (event) => this.setState({ speechInProgress: false }));
        speakMessage("Your new mobile number will be based on the zip code that you enter below");
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
            var z = this.state.results.filter(function (val) {
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
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle='dark-content' backgroundColor="white" />
                <View pointerEvents={this.state.speechInProgress ? 'none' : 'auto'}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }} showsVerticalScrollIndicator={false}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>What's their ZIP code?</Text>
                        <Text style={{ fontSize: 16, marginTop: 10 }}>The fist six digits of their new phone number are based on their ZIP code.</Text>
                        <View
                            style={{
                                height: 5,
                                marginTop: 10,
                                backgroundColor: 'black'
                            }}
                        />
                        <Text style={{ fontSize: 16, marginTop: 10, color: 'grey' }}>ZIP code</Text>
                        <TextInput
                            value={this.state.zipCode}
                            keyboardType='number-pad'
                            maxLength={6}
                            onFocus={() => this.setState({ highlight: false })}
                            underlineColorAndroid="transparent"
                            onChangeText={(value) => this.setState({ zipCode: value })}
                            style={[{
                                borderWidth: 1, borderColor: 'grey', borderBottomWidth: 3, borderBottomColor: 'black',
                                padding: 10, marginTop: 10,
                            }, this.state.highlight ? {
                                shadowColor: "red",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.51,
                                shadowRadius: 13.16,
                                elevation: 10,
                                backgroundColor: '#ddb8ca'
                            } : {}]}
                        />
                        {
                            this.state.zipCode ? <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate(RouteNames.HomeStack.selectNumber, { zipCode: this.state.zipCode });
                                }}
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