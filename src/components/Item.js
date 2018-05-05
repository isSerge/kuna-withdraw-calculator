import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuid from 'uuid'
import {
	TableRow,
	TableRowColumn,
} from 'material-ui/Table'
import { getRowStyle, formatNumber } from '../utils'
import { map, compose } from 'ramda'

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
	const columns = [
		name,
		rate,
		(amount).toFixed(5),
		withdrawFee,
		afterWithdrawAmount.toFixed(5),
		(marketPrice.priceBtc * afterWithdrawAmount).toFixed(5),
		(marketPrice.priceUsd * afterWithdrawAmount).toFixed(2),
	]

	const Column = x => <TableRowColumn key={uuid.v4()}>{formatNumber(x)}</TableRowColumn>
	const Row = x => <TableRow style={getRowStyle(name === bestOption)}>{x}</TableRow>
	const renderItem = compose(Row, map(Column))

	return renderItem(columns)
}

const mapStateToProps = state => ({
	uah: state.uah,
	bestOption: state.bestOption,
})

Item.propTypes = {
	name: PropTypes.string.isRequired,
	rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	withdrawFee: PropTypes.number.isRequired,
	marketPrice: PropTypes.object.isRequired,
	uah: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	bestOption: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(Item)
