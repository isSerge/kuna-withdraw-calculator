import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
	TableRow,
	TableRowColumn,
} from 'material-ui/Table'
import { getRowStyle } from '../utils'

const Item = ({
	name,
	rate,
	withdrawFee,
	marketPrice,
	uah,
	bestOption, 
}) => {
	const amount = uah / rate
	const afterWithdrawAmount = amount - withdrawFee

	return (
		<TableRow style={getRowStyle(name === bestOption)}>
			<TableRowColumn>{name}</TableRowColumn>
			<TableRowColumn>{rate}</TableRowColumn>
			<TableRowColumn>{(amount).toFixed(5)}</TableRowColumn>
			<TableRowColumn>{withdrawFee}</TableRowColumn>
			<TableRowColumn>{afterWithdrawAmount.toFixed(5)}</TableRowColumn>
			<TableRowColumn>{(marketPrice.priceBtc * afterWithdrawAmount).toFixed(5)}</TableRowColumn>
			<TableRowColumn>{(marketPrice.priceUsd * afterWithdrawAmount).toFixed(2)}</TableRowColumn>
		</TableRow>
	)
}

const mapStateToProps = state => ({
	currencies: state.currencies,
	uah: state.uah,
	bestOption: state.bestOption,
})

Item.propTypes = {
	currencyName: PropTypes.string,
	rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	withdrawFee: PropTypes.number,
	priceBtc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	priceUsd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	uah: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	bestOption: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(Item)
