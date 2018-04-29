import axios from 'axios'
import {
	FETCH_CURRENCIES_REQUEST,
	FETCH_CURRENCIES_SUCCESS,
	FETCH_KUNA_FAILURE,
	FETCH_MARKET_FAILURE,
	FETCH_KUNA_UPDATE,
	FETCH_MARKET_UPDATE,
	CHANGE_UAH_VALUE,
} from './constants'

const requestCurrencies = () => ({
	type: FETCH_CURRENCIES_REQUEST,
})

const updateCurrencies = () => ({
	type: FETCH_CURRENCIES_SUCCESS,
})

const updateKuna = rates => ({
	type: FETCH_KUNA_UPDATE,
	rates
})

const updateMarket = prices => ({
	type: FETCH_MARKET_UPDATE,
	prices,
})

const fetchKunaFailure = error => ({
	type: FETCH_KUNA_FAILURE,
	error,
})

const fetchMarketFailure = error => ({
	type: FETCH_MARKET_FAILURE,
	error,
})

export const fethCurrencies = currencies => async(dispatch) => {
	dispatch(requestCurrencies())

	const kunaUrl = 'https://kuna.io/api/v2/tickers'
	const marketUrl = 'https://api.coinmarketcap.com/v1/ticker'

	const kuna = await Promise.all(currencies.map(x =>
		axios
			.get(`${kunaUrl}/${x.kunaName}uah/`)
			.then(r => r.data.ticker.last)
			.catch(e => dispatch(fetchKunaFailure(e)))
		))

	dispatch(updateKuna(kuna))

	const market = await Promise.all(currencies.map(x =>
		axios
			.get(`${marketUrl}/${x.cmc}/`)
			.then(r => ({
				priceBtc: r.data[0].price_btc,
				priceUsd: r.data[0].price_usd,
			}))
			.catch(e => dispatch(fetchMarketFailure(e)))
		))
	
	dispatch(updateMarket(market))

	return dispatch(updateCurrencies())
}

export const updateUah = value => ({
	type: CHANGE_UAH_VALUE,
	value
})
