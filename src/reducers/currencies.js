import {
	FETCH_CURRENCIES_REQUEST,
	FETCH_CURRENCIES_SUCCESS,
	FETCH_KUNA_UPDATE,
	FETCH_KUNA_FAILURE,
	FETCH_MARKET_UPDATE,
	FETCH_MARKET_FAILURE,
} from '../constants'

const initialState = {
	items: [
		{
			name: 'Ethereum',
			kunaName: 'eth',
			cmc: 'ethereum',
			rate: 0,
			withdrawFee: 0.005,
			marketPrice: {
				priceBtc: 0,
				priceUsd: 0,
			},
		},
		{
			name: 'Bitcoin',
			kunaName: 'btc',
			cmc: 'bitcoin',
			rate: 0,
			withdrawFee: 0.001,
			marketPrice: {
				priceBtc: 0,
				priceUsd: 0,
			},
		},
		{
			name: 'Waves',
			kunaName: 'waves',
			cmc: 'waves',
			rate: 0,
			withdrawFee: 0.01,
			marketPrice: {
				priceBtc: 0,
				priceUsd: 0,
			},
		},
		{
			name: 'Bitcoin Cash',
			kunaName: 'bch',
			cmc: 'bitcoin-cash',
			rate: 0,
			withdrawFee: 0.001,
			marketPrice: {
				priceBtc: 0,
				priceUsd: 0,
			},
		},
		{
			name: 'Golos Gold',
			kunaName: 'gbg',
			cmc: 'golos-gold',
			rate: 0,
			withdrawFee: 0,
			marketPrice: {
				priceBtc: 0,
				priceUsd: 0,
			},
		},
		{
			name: 'Ripple',
			kunaName: 'xrp',
			cmc: 'ripple',
			rate: 0,
			withdrawFee: 0.02,
			marketPrice: {
				priceBtc: 0,
				priceUsd: 0,
			},
		},
		{
			name: 'Litecoin',
			kunaName: 'ltc',
			cmc: 'litecoin',
			rate: 0,
			withdrawFee: 0.001,
			marketPrice: {
				priceBtc: 0,
				priceUsd: 0,
			},
		},
		{
			name: 'Stellar',
			kunaName: 'xlm',
			cmc: 'stellar',
			rate: 0,
			withdrawFee: 0.001,
			marketPrice: {
				priceBtc: 0,
				priceUsd: 0,
			},
		},
	],
	isFetching: false,
	error: '',
}

export default function currencies(state = initialState, action) {
	switch (action.type) {
		case FETCH_CURRENCIES_REQUEST: {
			return { ...state, isFetching: true }
		}
		case FETCH_CURRENCIES_SUCCESS: {
			return { ...state, isFetching: false }
		}
		case FETCH_KUNA_UPDATE: {
			return {
				...state,
				items: state.items.map((x, i) => ({...x, rate: action.rates[i]}))
			}
		}
		case FETCH_KUNA_FAILURE: {
			// todo: make individual error and global isFetching
			return { ...state, error: action.error, isFetching: false }
		}
		case FETCH_MARKET_UPDATE: {
			return {
				...state,
				items: state.items.map((x, i) => ({...x, marketPrice: action.prices[i]}))
			}
		}
		case FETCH_MARKET_FAILURE: {
			// todo: make individual error and global isFetching
			return { ...state, error: action.error, isFetching: false }
		}
		default:
			return state
	}
}
