export const getRowStyle = (rate, isBestOption) => 
	({ backgroundColor: rate !== 0 && isBestOption ? 'coral' : 'inherit' })