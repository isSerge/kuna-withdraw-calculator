import { head, prop, path } from 'ramda'

export const getRowStyle = isBestOption => 
	({ backgroundColor: isBestOption ? 'coral' : 'inherit' })

export const getBestOptionName = (currencies, uah) => {
    const arr = currencies.items.map(x => ({
		name: prop('name', x),
		final: path(['marketPrice', 'priceBtc'], x) * (uah / prop('rate', x) - prop('withdrawFee', x)),
	}))

    return prop('name', head(arr.sort((a, b) => prop('final', a) < prop('final', b))))
}

export const calculateProfit = (price, amount) => price * amount