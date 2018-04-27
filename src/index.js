import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker'
import configureStore from './configureStore'

const store = configureStore()

ReactDOM.render(
	<MuiThemeProvider>
		<Provider store={store}>
			<App />
		</Provider>
	</MuiThemeProvider>,
	document.getElementById('root'),
)

registerServiceWorker();
