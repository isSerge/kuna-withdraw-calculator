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
	amount,
	withdrawFee,
	afterWithdraw,
	btcPrice,
	usdPrice,
	isBestOption,
}) => (
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

Item.propTypes = {
	currencyName: PropTypes.string,
	rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	uah: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	withdrawFee: PropTypes.number,
	afterWithdraw: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	priceBtc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	priceUsd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	isBestOption: PropTypes.bool,
}

export default Item
