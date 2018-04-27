import axios from 'axios'
import {
	FETCH_KUNA_REQUEST,
	FETCH_KUNA_UPDATE,
	FETCH_MARKET_REQUEST,
	FETCH_MARKET_UPDATE,
	CHANGE_UAH_VALUE,
} from './constants'

const requestKuna = () => ({
	type: FETCH_KUNA_REQUEST,
})

const updateKuna = rates => ({
	type: FETCH_KUNA_UPDATE,
	rates
})

const requestMarket = () => ({
	type: FETCH_MARKET_REQUEST,
})

const updateMarket = prices => ({
	type: FETCH_MARKET_UPDATE,
	prices,
})

export const fetchKuna = currencies => dispatch => {
	dispatch(requestKuna())

	const url = 'https://kuna.io/api/v2/tickers'
	const requests = currencies.map(x =>
		axios
			.get(`${url}/${x.kunaName}uah/`)
			.then(r => r.data.ticker.last),
	)

	return Promise.all(requests)
		.then(values => dispatch(updateKuna(values)))
}

export const fetchMarket = currencies => dispatch => {
	dispatch(requestMarket())
	const url = 'https://api.coinmarketcap.com/v1/ticker'
	const requests = currencies.map(x =>
		axios.get(`${url}/${x.cmc}/`).then(r => ({
			priceBtc: r.data[0].price_btc,
			priceUsd: r.data[0].price_usd,
		})),
	)

	return Promise.all(requests)
		.then(values => dispatch(updateMarket(values)))
}

export const updateUah = value => ({
	type: CHANGE_UAH_VALUE,
	value
})
