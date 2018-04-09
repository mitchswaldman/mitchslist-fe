import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css'
import './skeleton.css'
import { loadState, saveState } from './localStorage'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from './store/configureStore'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import throttle from 'lodash/throttle'

const preloadedState = loadState()
let store = configureStore(preloadedState)
store.subscribe(throttle(() => {
	saveState({
		"access": store.getState().access
	})
}))

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>, 
	document.getElementById('root'));
registerServiceWorker();
