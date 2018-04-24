import {
	CHANGE_UAH_VALUE
} from '../constants'

const initialState = {
	value: 1000
}

export default function uah(state = initialState, action) {
	switch (action.type) {
		case CHANGE_UAH_VALUE: {
			return { ...state, value: action.value }
		}
		default:
			return state
	}
}
