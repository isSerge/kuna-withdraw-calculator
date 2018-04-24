import { combineReducers } from 'redux'
import kuna from './kuna'
import market from './market'
import uah from './uah'

export default combineReducers({
	kuna,
	market,
	uah,
})
