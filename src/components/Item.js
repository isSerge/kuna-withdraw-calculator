import React from 'react'
import PropTypes from 'prop-types'
import {
	TableRow,
	TableRowColumn,
} from 'material-ui/Table'
import LinearProgress from 'material-ui/LinearProgress'
import { getRowStyle, calculateProfit } from '../utils'

const Item = ({
	currencyName,
	rate,
	amount,
	withdrawFee,
	priceBtc,
	priceUsd,
	isBestOption,
}) => {
	const afterWithdrawAmount = amount - withdrawFee

	return (
		<TableRow style={getRowStyle(isBestOption)}>
			<TableRowColumn>{currencyName}</TableRowColumn>
			<TableRowColumn>{rate}</TableRowColumn>
			<TableRowColumn>{amount.toFixed(5)}</TableRowColumn>
			<TableRowColumn>{withdrawFee}</TableRowColumn>
			<TableRowColumn>{afterWithdrawAmount.toFixed(5)}</TableRowColumn>
			<TableRowColumn>{calculateProfit(priceBtc, afterWithdrawAmount).toFixed(5)}</TableRowColumn>
			<TableRowColumn>{calculateProfit(priceUsd, afterWithdrawAmount).toFixed(2)}</TableRowColumn>
		</TableRow>
	)
}

Item.propTypes = {
	currencyName: PropTypes.string,
	rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	uah: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	withdrawFee: PropTypes.number,
	priceBtc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	priceUsd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	isBestOption: PropTypes.bool,
}

export default Item
