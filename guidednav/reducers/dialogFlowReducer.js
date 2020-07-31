import * as ActionTypes from '../actions/ActionTypes';

const DEF_DIALOGFLOW_STATE = {
    loading: false,
    results: null,
    error: null
};

const dialogFlowReducer = (state=DEF_DIALOGFLOW_STATE,action) => {
    switch(action.type){
        case ActionTypes.FETCH_INTENT_PENDING:
            return{
                ...state,
                loading: true,
                results: null
            }
        case ActionTypes.FETCH_INTENT_SUCCESS:
            return {
                ...state,
                loading: false,
                results: action.response
            }
        case ActionTypes.FETCH_INTENT_FAIL:
            return {
                ...state,
                loading: false,
                results: null,
                error: action.error
            }
        default:
            return {
                ...state
            }
    }
}

export default dialogFlowReducer;
