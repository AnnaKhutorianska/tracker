import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemText, IconButton, ButtonGroup } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';

import { deleteTracker, startTracker, pauseTracker } from '../../store/actions/trackerActions';

const styles = {
    listItem: {
        width: '100%',
        backgroundColor: '#fff'
    },
    listItemActive: {
        backgroundColor: '#fdfdf6',
        color: '#3faf6c'
    }
};

function TrackersList() {
    const dispatch = useDispatch();
    const [, setState] = useState(null);
    const trackers = useSelector(state => state.trackers);

    useEffect(() => {
        const id = setInterval(() => setState(Date.now()), 1000);

        return () => {
            clearInterval(id);
        };
    }, []);

    function handleClickDelete(id) {
        dispatch(deleteTracker(id));
    }

    function handleClickStart(id) {
        dispatch(startTracker(id));
    }

    function handleClickPause(tracker) {
        dispatch(pauseTracker(tracker));
    }

    function getPassedTime(tracker) {
        const now = moment().add(tracker.passedSec, 'seconds');

        if (tracker.isActive) {
            const duration = moment.duration(now.diff(moment(tracker.date)));
            return moment.utc(duration.as('milliseconds')).format('HH:mm:ss');
        }

        const duration = moment.duration(now.diff(moment()));
        return moment.utc(duration.as('milliseconds')).format('HH:mm:ss');
    }

    return (
        <List sx={styles.listItem}>
            {trackers.map(tracker => (
                <ListItem
                    sx={tracker.isActive && styles.listItemActive}
                    key={tracker.id}
                    disableGutters
                    secondaryAction={
                        <ButtonGroup>
                            <IconButton
                                onClick={tracker.isActive
                                    ? handleClickPause.bind(null, tracker)
                                    : handleClickStart.bind(null, tracker.id)
                                }
                            >
                                {tracker.isActive ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />}
                            </IconButton>
                            <IconButton onClick={handleClickDelete.bind(null, tracker.id)}>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                        </ButtonGroup>
                    }
                >
                    <ListItemText primary={tracker.name} secondary={getPassedTime(tracker)} />
                </ListItem>
            ))}
        </List>
    );
}

export default TrackersList;
