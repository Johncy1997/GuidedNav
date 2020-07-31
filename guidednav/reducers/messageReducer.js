import * as ActionTypes from '../actions/ActionTypes';

const DEF_MESSAGE_STATE = {
    loading: false,
    responses: []
};

const messageReducer = (state=DEF_MESSAGE_STATE,action) => {
    switch(action.type){
        case ActionTypes.ADD_BOT_MESSAGE_PENDING:
            return{
                ...state,
                loading: true
            }
        case ActionTypes.ADD_BOT_MESSAGE_SUCCESS:
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
