import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
    StyleSheet,
    TextInput
} from 'react-native';
import { connect } from "react-redux";
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { addMessage } from '../../actions/messageActions';
import CONSTANTS from '../../utils/Constants';
import { dialogFlowConfig } from '../../utils/dialogFlowConfig';
import VoiceInput from '../../utils/VoiceInput';
import { handleWithOS } from '../../utils/CommonFunctions';

class BotHome extends Component {

    state = {
        mdn: "101010",
        bot: "VA",
        isRenderFooter: false,
        input: ''
    }

    constructor(props) {
        super(props);
        this.onUserSendMessage = this.onUserSendMessage.bind(this);
    }

    componentDidMount() {
        Dialogflow_V2.setConfiguration(
            dialogFlowConfig.client_email,
            dialogFlowConfig.private_key,
            Dialogflow_V2.LANG_ENGLISH_US,
            dialogFlowConfig.project_id
        );
    }

    handleGoogleResponse(result) {
        let payload = result.queryResult.fulfillmentMessages[0].payload;
        let text = result.queryResult.fulfillmentMessages[0].text;
        if(payload){
            this.sendBotResponse(payload["nav_tag"]);
            handleWithOS(payload["nav_tag"]);
        }else{
            this.sendBotResponse(text.text[0]);
        }
    }

    sendBotResponse(text) {
        let msg = {
            _id: this.props.msgs.responses.length + 1,
            text,
            createdAt: new Date(),
            user: {
                _id: this.state.bot
            }
        };
        this.props.addMessage([msg], CONSTANTS.BOT_MSG_TYPE);
    }

    hitDialogFlow(message) {
        Dialogflow_V2.requestQuery(
            message,
            result => this.handleGoogleResponse(result),
            error => console.log(error)
        );
    }

    onUserSendMessage(voiceMsg,error=false) {
        var inputMsg = voiceMsg ? voiceMsg: this.state.input;
        this.setState({
            input:''
        });
        if(error){
            let msg = {
                _id: this.props.msgs.responses.length + 1,
                text,
                createdAt: new Date(),
                user: {
                    _id: this.state.bot
                }
            };
            this.props.addMessage([msg], CONSTANTS.BOT_MSG_TYPE);
        }else{
            this.hitDialogFlow(inputMsg);
            let msg = {
                _id: this.props.msgs.responses.length + 1,
                text: inputMsg,
                createdAt: new Date(),
                user: {
                    _id: this.state.mdn
                }
            };
            this.props.addMessage([msg], CONSTANTS.USER_MSG_TYPE);
        }   
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: {
                        color: 'white',
                    },
                    left: {
                        color: 'white',
                    }
                }}
                wrapperStyle={{
                    left: {
                        backgroundColor: 'blue',
                    },
                    right: {
                        backgroundColor: 'violet',
                    }
                }}
            />
        );
    }

    renderFooter(props) {
        if (this.state.isRenderFooter) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        typing....
                </Text>
                </View>
            );
        }
        return null
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <GiftedChat
                    renderAvatar={(props) => {
                        if (props.currentMessage.user._id === this.state.mdn) {
                            return (<Image
                                source={require('../../assets/user.png')}
                                style={{ height: 50, width: 50, resizeMode: 'center', borderRadius: 50 }}
                            ></Image>)
                        } else {
                            return (<Image
                                source={require('../../assets/v-icon.png')}
                                style={{ height: 50, width: 50, resizeMode: 'contain', borderRadius: 50 }}
                            ></Image>)
                        }

                    }}
                    showUserAvatar={true}
                    renderFooter={this.renderFooter.bind(this)}
                    renderInputToolbar={(props) => {
                        return (
                            <View style={{ width: '100%', height: 50, padding: 5, flexDirection: 'row', backgroundColor: '#6fa832', alignItems: 'center' }}>
                                <TextInput
                                    multiline={true}
                                    placeholder="Type your message..."
                                    underlineColorAndroid='transparent'
                                    ref={(input) => { this.input = input; }}
                                    onChangeText={(value) => this.setState({ input: value })}
                                    style={{
                                        borderBottomColor: 'transparent',
                                        borderBottomWidth: 1,
                                        width: '70%'
                                    }}
                                    value={this.state.input}
                                />
                                <TouchableOpacity disabled={true} style={{ height: '100%', width: '15%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        source={require('../../assets/u-pin.png')}
                                        style={{ width: '70%', height: '70%', resizeMode: 'contain' }}
                                    ></Image>
                                </TouchableOpacity>
                                {
                                    this.state.input ?
                                        <TouchableOpacity
                                            onPress={()=>this.onUserSendMessage()}
                                            disabled={this.state.input ? false : true}
                                            style={{ height: '100%', width: '15%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image
                                                source={require('../../assets/send-icon.png')}
                                                style={{ width: '70%', height: '70%', resizeMode: 'contain' }}
                                            ></Image>
                                        </TouchableOpacity> : <VoiceInput getUserVoiceMsg={(msg,error)=>this.onUserSendMessage(msg,error)}/>
                                }
                            </View>

                        )
                    }}
                    isAnimated={true}
                    multiline={true}
                    scrollToBottom={true}
                    messages={JSON.parse(JSON.stringify(this.props.msgs.responses)).reverse()}
                    renderBubble={this.renderBubble.bind(this)}
                    onSend={this.onUserSendMessage}
                    user={{
                        _id: this.state.mdn
                    }}
                />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    df: state.df,
    msgs: state.msgs
});

const mapDispatchToProps = dispatch => ({
    addMessage: (msgComponent, type) => dispatch(addMessage(msgComponent, type))
});

const styles = StyleSheet.create({
    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
        width: 80,
        height: 30,
        borderRadius: 30,
        justifyContent: 'center'
    },
    footerText: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center'
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(BotHome);