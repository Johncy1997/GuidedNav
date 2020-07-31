import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { connect } from "react-redux";
import { addMessage } from '../../actions/messageActions';


class BotHome extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log(this.props.df);
    }

    render(){
        return(
            <View style={{flex:1}}>
                <Text>BotHome</Text>
            </View>
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
  
export default connect(mapStateToProps,mapDispatchToProps)(BotHome);