import axios from 'axios'

export const fetchKuna = () => {
	const url = 'https://kuna.io/api/v2/tickers'
	const requests = this.state.currencies.map(x =>
		axios.get(`${url}/${x.kunaName}uah/`).then(r => r.data.ticker.sell),
	)

	Promise.all(requests).then(values =>
		this.setState(
			this.state.currencies.map((x, i) => (x.rate = values[i])),
		),
	)
}

export const fetchMarket = () => {
	const url = 'https://api.coinmarketcap.com/v1/ticker'
	const requests = this.state.currencies.map(x =>
		axios.get(`${url}/${x.cmc}/`).then(r => ({
			priceBtc: r.data[0].price_btc,
			priceUsd: r.data[0].price_usd,
		})),
	)

	Promise.all(requests).then(values =>
		this.setState(
			this.state.currencies.map((x, i) => (x.marketPrice = values[i])),
		),
	)
}

export const updateUah = value => {}
