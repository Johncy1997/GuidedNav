import * as ActionTypes from './ActionTypes';
import CONSTANTS from '../utils/Constants';

export const fetchIntent = (request) => {
    return (dispatch) =>{
        dispatch({
            type: ActionTypes.FETCH_INTENT_PENDING
        });
        fetch(CONSTANTS.BASEURL+'/public/search/taxi',{
            method: 'POST',
            headers: getHeader(),
            body: JSON.stringify(request) 
        }).then(response => response.json()) 
        .then(response => {
            dispatch({
                type: ActionTypes.SEARCH_TAXI_SUCCESS,
                response: response
            });
        })
        .catch((error) => {
            dispatch({
                type: ActionTypes.SEARCH_TAXI_ERROR,
                data: error
            });
        })
    }
}
