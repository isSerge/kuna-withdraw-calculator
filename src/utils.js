import { prop } from 'ramda'

export const getRowStyle = (rate, isBestOption) => 
	({ backgroundColor: rate !== 0 && isBestOption ? 'coral' : 'inherit' })

export const isBestOption = (x, state) =>
	prop('name', x) === getBestOption(state)

const getBestOption = state => {
    const arr = state.currencies.map(x => ({
		name: prop('name', x),
		final: x.marketPrice.priceBtc * (state.uah / prop('rate', x) - prop('withdraw', x)),
	}))

    return arr.sort((a, b) => a.final < b.final)[0].name
}