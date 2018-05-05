import axios from 'axios'
import {
	FETCH_CURRENCIES_REQUEST,
	FETCH_CURRENCIES_SUCCESS,
	FETCH_CURRENCIES_FAILURE,
	FETCH_KUNA_UPDATE,
	FETCH_MARKET_UPDATE,
	CHANGE_UAH_VALUE,
	UPDATE_BEST_OPTION,
} from './constants'

const requestCurrencies = () => ({
	type: FETCH_CURRENCIES_REQUEST,
})

const updateCurrencies = () => ({
	type: FETCH_CURRENCIES_SUCCESS,
})

const updateRates = rates => ({
	type: FETCH_KUNA_UPDATE,
	rates
})

const updatePrices = prices => ({
	type: FETCH_MARKET_UPDATE,
	prices,
})

const fetchFailure = error => ({
	type: FETCH_CURRENCIES_FAILURE,
	error,
})

const updateBestOption = () => ({
	type: UPDATE_BEST_OPTION
})

export const fethCurrencies = currencies => async(dispatch) => {
	dispatch(requestCurrencies())

	const kunaUrl = 'https://kuna.io/api/v2/tickers'
	const marketUrl = 'https://api.coinmarketcap.com/v1/ticker'

	const rates = await Promise.all(currencies.map(x =>
		axios
			.get(`${kunaUrl}/${x.kunaName}uah/`)
			.then(r => r.data.ticker.last)
			.catch(() => dispatch(fetchFailure('Something went wrong')))
		))

	dispatch(updateRates(rates))

	const prices = await Promise.all(currencies.map(x =>
		axios
			.get(`${marketUrl}/${x.cmc}/`)
			.then(r => ({
				priceBtc: r.data[0].price_btc,
				priceUsd: r.data[0].price_usd,
			}))
			.catch(() => dispatch(fetchFailure('Something went wrong')))
		))
	
	dispatch(updatePrices(prices))
	dispatch(updateCurrencies())
	dispatch(updateBestOption())
}

export const updateUah = value => dispatch => {
	dispatch({ type: CHANGE_UAH_VALUE, value})
	dispatch(updateBestOption())
}
