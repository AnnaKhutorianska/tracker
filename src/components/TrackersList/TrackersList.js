import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemText, IconButton, ButtonGroup, Typography } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';

function TrackersList() {
    const trackers = useSelector(state => state.trackers);

    const styles = {
        listItem: {
            width: '100%',
            backgroundColor: '#fff'
        },
        listItemActive: {
            backgroundColor: '#fdfdf6',
            color: '#3faf6c'
        }
    }

    return (
        <List sx={styles.listItem}>
            {trackers.map((tracker) => (
                <ListItem
                    sx={tracker.isActive && styles.listItemActive}
                    key={tracker.id}
                    disableGutters
                    secondaryAction={
                        <ButtonGroup>
                            <IconButton>
                                {tracker.isActive ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />}
                            </IconButton>
                            <IconButton>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                        </ButtonGroup>
                    }
                >
                    <ListItemText primary={<Typography />} secondary={tracker.date}/>
                </ListItem>
            ))}
        </List>
    );
}

export default TrackersList;
