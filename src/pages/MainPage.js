import React from 'react';

import Logo from '../components/Logo/Logo';
import InputTracker from '../components/InputTracker/InputTracker';
import TrackersList from '../components/TrackersList/TrackersList';

function MainPage() {
	return (
        <div>
            <Logo />
            <InputTracker />
            <TrackersList />
        </div>
    );
}

export default MainPage;
