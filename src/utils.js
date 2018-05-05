import * as R from 'ramda'

// redux utils
export const createReducer = (init, handlers) =>
	(state = init, action) =>
		R.propOr(R.identity, R.prop('type', action), handlers)(state, action)

// style utils
export const getRowStyle = isBestOption => 
	({ backgroundColor: isBestOption ? 'coral' : 'inherit' })


export const getBestOption = (currencies, uah) => {
	const calculateValue = x =>
		R.path(['marketPrice', 'priceBtc'], x) * (uah / R.prop('rate', x) - R.prop('withdrawFee', x))

	const transformation = x => ({
		name: R.prop('name', x),
		value: calculateValue(x),
	})

	const diff = (a, b) =>
		R.prop('value', a) < R.prop('value', b)

    return R.compose(
		R.prop('name'),
		R.head,
		R.sort(diff),
		R.map(transformation)
	)(currencies)
}

export const formatNumber = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
