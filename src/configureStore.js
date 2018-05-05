import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducer'

export default function configureStore() {
	return createStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(thunkMiddleware)),
	)
}
