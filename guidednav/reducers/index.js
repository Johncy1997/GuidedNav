import {combineReducers} from 'redux';

import dialogFlowReducer  from './dialogFlowReducer';
import messageReducer from './messageReducer';


const AppReducers = combineReducers({
    df: dialogFlowReducer,
    msgs: messageReducer
});

export default AppReducers;

