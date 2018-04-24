import {
	FETCH_KUNA_REQUEST,
	FETCH_KUNA_UPDATE,
	FETCH_KUNA_FAILURE,
} from '../constants'

const initialState = {
	currencies: [],
	isFetching: false,
	error: '',
}

export default function kuna(state = initialState, action) {
	switch (action.type) {
		case FETCH_KUNA_REQUEST: {
			return { ...state, isFetching: true }
		}
		case FETCH_KUNA_UPDATE: {
			return { ...state, currencies: action.currencies, isFetching: false }
		}
		case FETCH_KUNA_FAILURE: {
			return { ...state, error: action.error, isFetching: false }
		}
		default:
			return state
	}
}
