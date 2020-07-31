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
import { Dropdown } from 'react-native-material-dropdown';
import RouteNames from '../../navigators/RouteNames';

const NUMBERS = [
    {
        value: "646-123"
    },
    {
        value: "123-456"
    },
    {
        value: "233-456"
    },
    {
        value: "654-321"
    },
    {
        value: "098-765"
    },
    {
        value: "098-767"
    },
    {
        value: "124-567"
    },
    {
        value: "876-788"
    },
    {
        value: "980-945"
    },
    {
        value: "342-156"
    },
    {
        value: "767-676"
    },
    {
        value: "876-788"
    },
    {
        value: "980-945"
    },
    {
        value: "342-156"
    },
    {
        value: "767-676"
    },
    {
        value: "876-788"
    },
    {
        value: "980-945"
    },
    {
        value: "342-156"
    }
]
export default class SelectNumber extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            speechInProgress: false,
            highlight: true
        }
    }

    componentDidMount() {
        Tts.addEventListener('tts-start', (event) => this.setState({ speechInProgress: true }));
        Tts.addEventListener('tts-finish', (event) => this.setState({ speechInProgress: false }));
        Tts.addEventListener('tts-cancel', (event) => this.setState({ speechInProgress: false }));
        setTimeout(() => {
            this.drop.focus();
        }, 600);
        speakMessage("Now you can select one of the options from the drop down to proceed further. This gives you the first 6 digits of your new mobile number. You can select the last 4 digits in your next screen.");
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle='dark-content' backgroundColor="white" />
                <View>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }} showsVerticalScrollIndicator={false}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Pick the first six digits of their new number</Text>
                        <Text style={{ fontSize: 16, marginTop: 10 }}>The first six digits of their new phone number are based on the ZIP code you providec.</Text>
                        <View
                            style={{
                                height: 5,
                                marginTop: 10,
                                backgroundColor: 'black'
                            }}
                        />
                        <Text style={{ fontSize: 16, marginTop: 10, color: 'grey' }}>Phone number</Text>
                        <Dropdown
                            ref={drop=>this.drop=drop}
                            containerStyle={{
                                borderColor: 'grey',
                                borderWidth: 1,
                                width: '100%',
                                height: 50,
                                borderBottomWidth: 3,
                                borderBottomColor: 'black',
                                justifyContent: 'center',
                                paddingLeft: 5,
                                paddingRight: 5,
                                marginTop: 10
                            }}
                            inputContainerStyle={[{ borderBottomColor: 'transparent' },]}
                            label=""
                            data={NUMBERS}
                            labelPadding={50}
                            labelHeight={10}
                            itemPadding={5}
                            fontSize={16}
                            baseColor='black'
                            textColor='black'
                            disabledLineType='none'
                            itemColor='black'
                            selectedItemColor='black'
                            value={this.state.phone}
                            animationDuration={100}
                            onChangeText={(value) => { this.setState({ phone: value,highlight:false }); }}
                            labelTextStyle={[{
                                fontSize: 16,
                                color: 'black'
                            }]}
                            itemTextStyle={[{
                                fontSize: 16,
                                color: 'black'
                            }]}
                            renderAccessory={() => <Image source={require('../../assets/drop.png')} style={{ height: '100%', width: 30, resizeMode: 'contain' }} />}
                            pickerStyle={[{ 
                                borderBottomColor: 'transparent', 
                            marginLeft: 10, 
                            marginTop: 65, 
                            marginRight: 10, 
                            width: '92%' },this.state.highlight ? {
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
                            this.state.phone ? <TouchableOpacity
                                onPress={() => this.props.navigation.navigate(RouteNames.HomeStack.selectLastFour, { phone: this.state.phone })}
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
                disabled={this.state.speechInProgress}
                style={{ position: 'absolute', bottom: 10, right: 10, }}>
                    <Image style={{ height: 40, width: 40, resizeMode: 'contain',tintColor: this.state.speechInProgress ? 'blue' : 'black' }} source={require('../../assets/record.png')} />
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}