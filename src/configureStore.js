import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'

export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(thunkMiddleware)),
	)
}
