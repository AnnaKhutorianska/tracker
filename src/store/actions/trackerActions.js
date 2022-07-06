import moment from 'moment';

import { ActionTypes } from '../constants/actionsTypes';

export function addNewTracker(tracker) {
    return {
        type: ActionTypes.ADD_NEW_TRACKER,
        payload: {
            id: Date.now(),
            name: tracker,
            date: moment().format(),
            isActive: true
        }
    }
}