import { ActionTypes } from '../constants/actionsTypes';

const initialState = {
    trackers: []
};

export default function TrackerReducer(state = initialState, {type, payload}) {
    switch(type) {
        case ActionTypes.ADD_NEW_TRACKER:
            return {
                ...state,
                trackers: [
                    ...state.trackers,
                    payload
                ]
            };
        
        default:
            return state;    
    }
}