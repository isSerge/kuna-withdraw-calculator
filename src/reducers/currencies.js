import {
	FETCH_KUNA_REQUEST,
	FETCH_KUNA_UPDATE,
	FETCH_KUNA_FAILURE,
	FETCH_MARKET_REQUEST,
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
			withdraw: 0.005,
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
			withdraw: 0.001,
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
			withdraw: 0.01,
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
			withdraw: 0.001,
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
			withdraw: 0,
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
			withdraw: 0.02,
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
			withdraw: 0.001,
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
			withdraw: 0.001,
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
		case FETCH_KUNA_REQUEST: {
			return { ...state, isFetching: true }
		}
		case FETCH_KUNA_UPDATE: {
			return {
				...state,
				items: state.items.map((x, i) => {
					x.rate = action.rates[i]
					return x
				}),
				isFetching: false,
			}
		}
		case FETCH_KUNA_FAILURE: {
			return { ...state, error: action.error, isFetching: false }
		}
		case FETCH_MARKET_REQUEST: {
			return { ...state, isFetching: true }
		}
		case FETCH_MARKET_UPDATE: {
			return {
				...state,
				currencies: state.items.map((x, i) => {
					x.marketPrice = action.prices[i]
					return x
				}),
				isFetching: false
			}
		}
		case FETCH_MARKET_FAILURE: {
			return { ...state, error: action.error, isFetching: false }
		}
		default:
			return state
	}
}
