import axios from 'axios'
import {
	FETCH_KUNA_REQUEST,

	FETCH_MARKET_REQUEST,
	CHANGE_UAH_VALUE,
} from './constants'

const requestKuna = () => ({
	type: FETCH_KUNA_REQUEST,
})

const requestMarket = () => ({
	type: FETCH_MARKET_REQUEST,
})

export const fetchKuna = () => {
	// const url = 'https://kuna.io/api/v2/tickers'
	// const requests = this.state.currencies.map(x =>
	// 	axios.get(`${url}/${x.kunaName}uah/`).then(r => r.data.ticker.sell),
	// )

	// Promise.all(requests).then(values =>
	// 	this.setState(
	// 		this.state.currencies.map((x, i) => (x.rate = values[i])),
	// 	),
	// )
	console.log('fetchKuna')

	return dispatch => {
		dispatch(requestKuna())


	}
}

export const fetchMarket = () => {
	// const url = 'https://api.coinmarketcap.com/v1/ticker'
	// const requests = this.state.currencies.map(x =>
	// 	axios.get(`${url}/${x.cmc}/`).then(r => ({
	// 		priceBtc: r.data[0].price_btc,
	// 		priceUsd: r.data[0].price_usd,
	// 	})),
	// )

	// Promise.all(requests).then(values =>
	// 	this.setState(
	// 		this.state.currencies.map((x, i) => (x.marketPrice = values[i])),
	// 	),
	// )
	console.log('fetchMarket')

	return dispatch => {
		dispatch(requestMarket())
	}
}

export const updateUah = value => ({
	type: CHANGE_UAH_VALUE,
	value
})
