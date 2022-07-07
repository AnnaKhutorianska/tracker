import React, { useState} from 'react';
import { useDispatch } from 'react-redux';

import { addNewTracker } from '../../store/actions/trackerActions';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

function InputTracker() {
	const [inputValue, setInputValue] = useState('');
	const dispatch = useDispatch();
	const styles = {
		input: {
			width: '100%',
			border: '1px solid #000',
			borderRadius: '25px',
			marginBottom: '20px'
		},
		buttonWrapper: {
			padding : 0 
		},
		buttonIcon: {
			fontSize: '50px',
			color: '#3faf6c',
			'@media screen and (max-width: 560px)': {
                fontSize: '30px'
            },
		}
	};

	function handleChange(e) {
		setInputValue(e.target.value);
	}

	function handleClick() {
		if(inputValue) dispatch(addNewTracker(inputValue));
		setInputValue('');
	}

	return (
		<>
			<InputBase
				sx={styles.input}
				value={inputValue}
				placeholder='Enter tracker name'
				onChange={(e) => handleChange(e)}
				inputProps={{
					sx: {
					  "&::placeholder": {
						fontSize: '18px',
						paddingLeft: '10px',
						'@media screen and (max-width: 560px)': {
							fontSize: '14px'
						},
					  }
					}
				  }}
				endAdornment={
					<IconButton onClick={handleClick} sx={styles.buttonWrapper}>
						<PlayCircleIcon sx={styles.buttonIcon} />
					</IconButton>
				}
			/>
		</>
	)

}

export default InputTracker;
