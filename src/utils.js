import { compose, head, map, prop, path, sort } from 'ramda'

export const getRowStyle = isBestOption => 
	({ backgroundColor: isBestOption ? 'coral' : 'inherit' })

export const getBestOptionName = (currencies, uah) => {
	const calculateValue = x =>
		path(['marketPrice', 'priceBtc'], x) * (uah / prop('rate', x) - prop('withdrawFee', x))

	const transformation = x => ({
		name: prop('name', x),
		value: calculateValue(x),
	})

	const diff = (a, b) =>
		prop('value', a) < prop('value', b)

    return compose(
		prop('name'),
		head,
		sort(diff),
		map(transformation),
		prop('items')
	)(currencies)
}