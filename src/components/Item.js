import React from 'react'
import PropTypes from 'prop-types'
import {
	TableRow,
	TableRowColumn,
} from 'material-ui/Table'
import LinearProgress from 'material-ui/LinearProgress'
import { getRowStyle } from '../utils'

const Item = ({
	currencyName,
	rate,
	uah,
	withdrawFee,
	marketPrice,
	isBestOption,
	isFetching,
}) => {
	const amount = (uah / rate).toFixed(5)
	const afterWithdraw = (amount - withdrawFee).toFixed(5)
	const btcPrice = (marketPrice.priceBtc * afterWithdraw).toFixed(5)
	const usdPrice = (marketPrice.priceUsd * afterWithdraw).toFixed(2)

	return (
		<TableRow style={getRowStyle(isBestOption)}>
			<TableRowColumn>{currencyName}</TableRowColumn>
			<TableRowColumn>{rate}</TableRowColumn>
			<TableRowColumn>{amount}</TableRowColumn>
			<TableRowColumn>{withdrawFee}</TableRowColumn>
			<TableRowColumn>{afterWithdraw}</TableRowColumn>
			<TableRowColumn>{btcPrice}</TableRowColumn>
			<TableRowColumn>{usdPrice}</TableRowColumn>
		</TableRow>
	)
}

Item.propTypes = {
	currencyName: PropTypes.string.isRequired,
	rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	uah: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	withdrawFee: PropTypes.number.isRequired,
	marketPrice: PropTypes.shape({
		priceBtc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		priceUsd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	}).isRequired,
	isBestOption: PropTypes.bool.isRequired,
	isFetching: PropTypes.bool.isRequired,
}

export default Item
