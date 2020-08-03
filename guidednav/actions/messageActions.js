import * as ActionTypes from './ActionTypes';
import CONSTANTS from '../utils/Constants';

export const addMessage = (msgComponent,type) => {
    return (dispatch) =>{
        dispatch({
            type: ActionTypes.ADD_BOT_MESSAGE_PENDING
        });
        if(!msgComponent){
            dispatch({
                type: ActionTypes.ADD_BOT_MESSAGE_FAIL,
                message: CONSTANTS.ERROR_MSG,
                msgType: type
            });
        }else if(type === CONSTANTS.USER_MSG_TYPE){
            //This is user input msg
            dispatch({
                type: ActionTypes.ADD_BOT_MESSAGE_SUCCESS,
                message: msgComponent,
                msgType: type
            });
        }else{
            //This is bot msgs
            dispatch({
                type: ActionTypes.ADD_BOT_MESSAGE_SUCCESS,
                message: msgComponent,
                msgType: type
            });
        }
    }
}
