import {applyMiddleware,createStore} from 'redux';
import thunk from 'redux-thunk';
import AppReducers from '../reducers';


const rootReducer = (state,action) => {
    return AppReducers(state,action)
}

export default createStore(rootReducer,applyMiddleware(thunk));