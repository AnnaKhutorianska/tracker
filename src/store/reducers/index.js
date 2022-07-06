import { ActionTypes } from '../constants/actionsTypes';
import { getStorage, setStorage } from '../../utils/storage';

const initialState = {
    trackers: getStorage('trackers') || []
};

export default function TrackerReducer(state = initialState, { type, payload }) {
    console.log(state);

    switch (type) {
        case ActionTypes.ADD_NEW_TRACKER:
            const addTrackers = [...state.trackers, payload];
            setStorage('trackers', addTrackers);

            return {
                ...state,
                trackers: addTrackers
            };

        case ActionTypes.START_TRACKER:
            const startTrackers = state.trackers.map(tracker => {
                if (tracker.id === payload.id) return {
                    ...tracker,
                    ...payload
                };

                return tracker;
            });
            setStorage('trackers', startTrackers);

            return {
                ...state,
                trackers: startTrackers
            };

        case ActionTypes.PAUSE_TRACKER:
            const pauseTrackers = state.trackers.map(tracker => {
                if (tracker.id === payload.id) return {
                    ...tracker,
                    ...payload
                };

                return tracker;
            });
            setStorage('trackers', pauseTrackers);

            return {
                ...state,
                trackers: pauseTrackers
            };

        case ActionTypes.DELETE_TRACKER:
            const deleteTrackers = state.trackers.filter(tracker => tracker.id !== payload);
            setStorage('trackers', deleteTrackers);

            return {
                ...state,
                trackers: deleteTrackers
            };

        default:
            return state;
    }
}
