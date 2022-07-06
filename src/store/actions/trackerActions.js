import moment from 'moment';

import { ActionTypes } from '../constants/actionsTypes';

export function addNewTracker(tracker) {
    return {
        type: ActionTypes.ADD_NEW_TRACKER,
        payload: {
            id: Date.now(),
            name: tracker,
            date: moment().format(),
            isActive: true,
            passedSec: 0
        }
    };
}

export function pauseTracker({ id, date, passedSec }) {
    const startDate = moment(date);

    return {
        type: ActionTypes.PAUSE_TRACKER,
        payload: {
            id,
            isActive: false,
            passedSec: passedSec + +moment().diff(startDate, 'seconds')
        }
    };
}

export function startTracker(id) {
    return {
        type: ActionTypes.START_TRACKER,
        payload: {
            id,
            isActive: true,
            date: moment().format()
        }
    };
}

export function deleteTracker(id) {
    return {
        type: ActionTypes.DELETE_TRACKER,
        payload: id
    };
}
