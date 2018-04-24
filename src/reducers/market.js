import {
	FETCH_MARKET_REQUEST,
	FETCH_MARKET_UPDATE,
	FETCH_MARKET_FAILURE,
} from '../constants'

const initialState = {
	currencies: [],
	isFetching: false,
	error: '',
}

export default function kuna(state = initialState, action) {
	switch (action.type) {
		case FETCH_MARKET_REQUEST: {
			return { ...state, isFetching: true }
		}
		case FETCH_MARKET_UPDATE: {
			return {
				...state,
				currencies: action.currencies,
				isFetching: false,
			}
		}
		case FETCH_MARKET_FAILURE: {
			return { ...state, error: action.error, isFetching: false }
		}
		default:
			return state
	}
}
