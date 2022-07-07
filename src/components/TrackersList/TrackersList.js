import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemText, IconButton, ButtonGroup, Typography, Divider, Paper, Box } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';

import { deleteTracker, startTracker, pauseTracker } from '../../store/actions/trackerActions';

function TrackersList() {
    const dispatch = useDispatch();
    const [, setState] = useState(null);
    const trackers = useSelector(state => state.trackers);
    const styles = {
        listItem: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        listItemActive: {
            backgroundColor: '#fdfdf6'
        },
        listItemText: {
            display: 'inline-block',
            fontSize: '16px',
            fontWeight: '600',
            maxWigth: '200px',
            '@media screen and (max-width: 560px)': {
                fontSize: '12px'
            },
        },
        listItemName: {
            maxWidth: 'calc(100% - 40%)',
            overflow: 'hidden',
            margin: '0 10px'
        },
        listItemTime: {
            paddingRight: '70px',
            '@media screen and (max-width: 560px)': {
                paddingRight: '40px'
            },
        },
        listItemTextIsActive: {
            color: '#61bc83',
        },
        button: {
            '@media screen and (max-width: 560px)': {
                fontSize: '20px'
            },
        },
        buttonIconPause: {
            fontSize: '30px',
            color: '#000',
        },
        buttonIconDelete: {
            fontSize: '30px',
            color: '#d67584',
        }
    };

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
        <List>
        <Divider />
            {trackers.map(tracker => (
                <Box key={tracker.id}>
                    <ListItem
                        sx={[tracker.isActive && styles.listItemActive]}
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
                                    {tracker.isActive ?
                                        <PauseCircleOutlineIcon sx={[styles.buttonIconPause, styles.button]} />
                                        : <PlayCircleOutlineIcon sx={[styles.buttonIconPause, styles.button]} />}
                                </IconButton>
                                <IconButton onClick={handleClickDelete.bind(null, tracker.id)}>
                                    <RemoveCircleOutlineIcon sx={[styles.buttonIconDelete, styles.button]} />
                                </IconButton>
                            </ButtonGroup>
                        }
                    >
                        <ListItemText
                            sx={[styles.listItem, tracker.isActive && styles.listItemTextIsActive]}
                            primary={<Typography sx={[styles.listItemText, styles.listItemName]}>{tracker.name}</Typography>}
                            secondary={<Typography sx={[styles.listItemText, styles.listItemTime]}>{getPassedTime(tracker)}</Typography>}
                        />

                    </ListItem>
                    <Divider />
                </Box>
            ))}
        </List>
    );
}

export default TrackersList;
