import { createReducer } from './utils'
import {
	CHANGE_UAH_VALUE,
	UPDATE_BEST_OPTION,
	FETCH_CURRENCIES_REQUEST,
	FETCH_CURRENCIES_SUCCESS,
	FETCH_CURRENCIES_FAILURE,
	FETCH_KUNA_UPDATE,
	FETCH_MARKET_UPDATE,
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
	[FETCH_MARKET_UPDATE]:(state, action) => ({
		...state,
		currencies: state.currencies.map((x, i) => ({...x, marketPrice: action.prices[i]})),
	}),
	[FETCH_CURRENCIES_FAILURE]:(state, action) => ({ ...state, error: action.error, isFetching: false }),
}

export default createReducer(initialState, actionHandlers)
