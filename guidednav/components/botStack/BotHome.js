import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import { connect } from "react-redux";
import {GiftedChat,Bubble} from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { addMessage } from '../../actions/messageActions';
import CONSTANTS from '../../utils/Constants';
import { dialogFlowConfig } from '../../utils/dialogFlowConfig';

class BotHome extends Component{

    state = {
        mdn: "101010",
        bot:"VA",
        isRenderFooter:false
    }

    constructor(props){
        super(props);
        this.onUserSendMessage = this.onUserSendMessage.bind(this);
    }

    componentDidMount(){
        Dialogflow_V2.setConfiguration(
            dialogFlowConfig.client_email,
            dialogFlowConfig.private_key,
            Dialogflow_V2.LANG_ENGLISH_US,
            dialogFlowConfig.project_id
          );
    }

    handleGoogleResponse(result) {
        let text = result.queryResult.fulfillmentMessages[0].text.text[0];
        this.sendBotResponse(text);
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
        this.props.addMessage([msg],CONSTANTS.BOT_MSG_TYPE);
    }
    
    hitDialogFlow(message){
        Dialogflow_V2.requestQuery(
            message,
            result => this.handleGoogleResponse(result),
            error => console.log(error)
          );
    }

    onUserSendMessage(messages){
        this.hitDialogFlow(messages[0].text);
        this.props.addMessage(messages,CONSTANTS.USER_MSG_TYPE);
    }

    renderBubble(props) {
        return (
          <Bubble
            {...props}
            textStyle={{
                right: {
                  color: 'white',
                },
                left:{
                    color: 'white',
                }
              }}
            wrapperStyle={{
                left:{
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
        if(this.state.isRenderFooter)
        {
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

    render(){
        return(
            <SafeAreaView style={{flex:1}}>
                <GiftedChat
                    renderAvatar={(props)=>{
                        if(props.currentMessage.user._id === this.state.mdn){
                            return(<Image
                            source={require('../../assets/user.png')}
                            style={{ height: 50, width: 50, resizeMode: 'center', borderRadius:50 }}
                            ></Image>)
                        }else{
                            return(<Image
                                source={require('../../assets/v-icon.png')}
                                style={{ height: 50, width: 50, resizeMode: 'contain', borderRadius:50 }}
                                ></Image>)
                        }
                        
                    }} 
                    showUserAvatar={true}
                    renderFooter={this.renderFooter.bind(this)}
                    isAnimated={true}
                    scrollToBottom={true}
                    messages= {JSON.parse(JSON.stringify(this.props.msgs.responses)).reverse()}
                    renderBubble={this.renderBubble.bind(this)}
                    onSend={this.onUserSendMessage}
                    user={{
                        _id:this.state.mdn

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
    addMessage: (msgComponent,type) => dispatch(addMessage(msgComponent,type))
});

const styles = StyleSheet.create({
    footerContainer: {
      marginTop: 5,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
      backgroundColor:'#f0f0f0',
      width:80,
      height:30,
      borderRadius:30,
      justifyContent:'center'
    },
    footerText: {
      fontSize: 14,
      color: 'black',
      textAlign:'center'
    },
  });
  
export default connect(mapStateToProps,mapDispatchToProps)(BotHome);