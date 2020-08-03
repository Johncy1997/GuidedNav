import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import Voice from '@react-native-community/voice';

export default class VoiceInput extends Component {

    state = {
        pitch: '',
        error: '',
        end: '',
        started: '',
        results: [],
        partialResults: [],
        speechInProgress: false
    };

    constructor(props) {
        super(props);
        Voice.onSpeechStart = this.onSpeechStart.bind(this);
        Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
        Voice.onSpeechError = this.onSpeechError.bind(this);
        Voice.onSpeechResults = this.onSpeechResults.bind(this);
        Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
        Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged.bind(this);
        Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    }

    componentWillUnmount() {
        //destroy the process after switching the screen 
        Voice.destroy().then(Voice.removeAllListeners);
    }

    onSpeechStart = e => {
        //Invoked when .start() is called without error
        console.log('onSpeechStart: ', e);
        this.setState({
            started: '√',
            speechInProgress: true
        });
    };


    onSpeechEnd = e => {
        //Invoked when SpeechRecognizer stops recognition
        console.log('onSpeechEnd: ', e);
        this.setState({
            end: '√',
            speechInProgress: true
        });

    };

    onSpeechError = e => {
        //Invoked when an error occurs. 
        console.log('onSpeechError: ', e);
        this.setState({
            error: JSON.stringify(e.error)
        },()=>{
            this.props.getUserVoiceMsg(e.error.message);
        });
        this.setState({
            speechInProgress: false
        });
    };

    onSpeechRecognized(e) {
        //Invoked when pitch that is recognized changed
        console.log('onSpeechRecognized: ', e);
    }

    onSpeechResults = e => {
        //Invoked when SpeechRecognizer is finished recognizing
        console.log('onSpeechResults: ', e);
        if (this.state.speechInProgress && e.value && e.value.length>0) {
            this.setState({
                results: e.value,
                speechInProgress: false
            });
            console.log(e.value[0]);
            this.props.getUserVoiceMsg(e.value[0]);
            this._cancelRecognizing();
        }

    };

    onSpeechPartialResults = e => {
        //Invoked when any results are computed
        console.log('onSpeechPartialResults: ', e);
        this.setState({
            partialResults: e.value,
            speechInProgress: true
        });
    };

    onSpeechVolumeChanged = e => {
        //Invoked when pitch that is recognized changed
        console.log('onSpeechVolumeChanged: ', e);
        this.setState({
            pitch: e.value,
            speechInProgress: true
        });
    };

    _startRecognizing = () => {
        //Starts listening for speech for a specific locale
        
            this.setState({
                pitch: '',
                error: '',
                started: '',
                results: [],
                partialResults: [],
                end: '',
                speechInProgress: true
            },async()=>{
                try {
                    await Voice.start('en-US', {
                        "RECOGNIZER_ENGINE": "GOOGLE",
                        "EXTRA_PARTIAL_RESULTS": true
                    });
                } catch (e) {
                    //eslint-disable-next-line
                    console.error(e);
                }
            });
        
    };

    _stopRecognizing = async () => {
        //Stops listening for speech
        try {
            await Voice.stop();
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    _cancelRecognizing = async () => {
        //Cancels the speech recognition
        try {
            await Voice.cancel();
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    _destroyRecognizer = async () => {
        //Destroys the current SpeechRecognizer instance
        try {
          await Voice.destroy();
        } catch (e) {
          //eslint-disable-next-line
          console.error(e);
        }
        this.setState({
          pitch: '',
          error: '',
          started: '',
          results: [],
          partialResults: [],
          end: '',
          speechInProgress: false
        });
      };

    render() {
        return (
            <TouchableOpacity
                onPress={()=>this._startRecognizing()}
                style={{ height: '100%', width: '15%', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('../assets/record.png')}
                    style={{ width: '90%', height: '70%', resizeMode: 'contain',
                    tintColor: this.state.speechInProgress? 'blue' : 'black' }}
                ></Image>
            </TouchableOpacity>
        )
    }
}