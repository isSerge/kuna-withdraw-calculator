import { createReducer } from './utils'
import {
	CHANGE_UAH_VALUE,
	UPDATE_BEST_OPTION,
	FETCH_CURRENCIES_REQUEST,
	FETCH_CURRENCIES_SUCCESS,
	FETCH_KUNA_UPDATE,
	FETCH_KUNA_FAILURE,
	FETCH_MARKET_UPDATE,
	FETCH_MARKET_FAILURE,
} from './constants'
import initialState from './initialState'
import { getBestOption } from './utils'

const actionHandlers = {
	[CHANGE_UAH_VALUE]: (state, action) => ({
		...state,
		uah: action.value,
	}),
	[UPDATE_BEST_OPTION]: (state, action) => ({
		...state,
		bestOption: getBestOption(state.currencies, state.uah),
	}),
	[FETCH_CURRENCIES_REQUEST]:(state, action) => ({ ...state, isFetching: true }),
	[FETCH_CURRENCIES_SUCCESS]:(state, action) => ({
		...state,
		isFetching: false,
	}),
	[FETCH_KUNA_UPDATE]:(state, action) => ({
		...state,
		currencies: state.currencies.map((x, i) => ({...x, rate: action.rates[i]})),
	}),
	// todo: make individual error and global isFetching
	[FETCH_KUNA_FAILURE]:(state, action) => ({ ...state, error: action.error, isFetching: false }),
	[FETCH_MARKET_UPDATE]:(state, action) => ({
		...state,
		currencies: state.currencies.map((x, i) => ({...x, marketPrice: action.prices[i]})),
	}),
	// todo: make individual error and global isFetching
	[FETCH_MARKET_FAILURE]:(state, action) => ({ ...state, error: action.error, isFetching: false }),
}

export default createReducer(initialState, actionHandlers)
