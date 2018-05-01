import { prop } from 'ramda'

export const getRowStyle = isBestOption => 
	({ backgroundColor: isBestOption ? 'coral' : 'inherit' })

export const isBestOption = (x, options, uah) =>
	prop('name', x) === getBestOption(options, uah)

const getBestOption = (options, uah) => {
    const arr = options.items.map(x => ({
		name: prop('name', x),
		final: x.marketPrice.priceBtc * (uah / prop('rate', x) - prop('withdrawFee', x)),
	}))

    return arr.sort((a, b) => a.final < b.final)[0].name
}

export const calculateProfit = (price, amount) => price * amount