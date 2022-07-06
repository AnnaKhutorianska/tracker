import { Provider } from 'react-redux';

import store from './store/store';
import MainPage from './pages/MainPage';

import './App.css';

function App() {
	return (
        <Provider store={store}>
            <div className='container'>
                <MainPage />
            </div>
        </Provider>
    );
}

export default App;
