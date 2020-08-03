import * as ActionTypes from '../actions/ActionTypes';
import CONSTANTS from '../utils/Constants';


const DEF_MESSAGE_STATE = {
    loading: false,
    responses: [
        {
            _id: 1,
            text: 'Welcome to Verizon Improved Chatbot',
            createdAt: new Date(),
            system:true,
            user:{
                _id: "VA",
            }
        },
        {
            _id: 2,
            text: 'Bot Message',
            createdAt: new Date(),
            user:{
                _id: "VA",
            }
        }
    ]
};

const messageReducer = (state=DEF_MESSAGE_STATE,action) => {
    switch(action.type){
        case ActionTypes.ADD_BOT_MESSAGE_PENDING:
            return{
                ...state,
                loading: true
            }
        case ActionTypes.ADD_BOT_MESSAGE_SUCCESS:
            if(action.msgType === CONSTANTS.USER_MSG_TYPE){
                return {
                    ...state,
                    loading: false,
                    responses: [...state.responses, ...action.message]
                }
            }else{
                return{
                    ...state
                }
            }
            
        case ActionTypes.ADD_BOT_MESSAGE_FAIL:
            return {
                ...state,
                loading: false,
                responses: [...state.responses, action.message]
            }
        default:
            return {
                ...state
            }
    }
}

export default messageReducer;
