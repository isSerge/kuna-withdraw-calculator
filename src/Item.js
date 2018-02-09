import React from 'react'
import {
	TableRow,
	TableRowColumn,
  } from 'material-ui/Table'
  import LinearProgress from 'material-ui/LinearProgress'

const Item = ({
	currencyName,
	rate,
	uah,
	withdrawFee,
	marketPrice,
	isBestOption
}) => {
	const amount = (uah / rate).toFixed(5)
	const afterWithdraw = (amount - withdrawFee).toFixed(5)
	const btcPrice = (marketPrice.priceBtc * afterWithdraw).toFixed(5)
	const usdPrice = (marketPrice.priceUsd * afterWithdraw).toFixed(2)
  
	return (
	  <TableRow style={{ backgroundColor: rate !== 0 && isBestOption ? 'coral' : 'inherit' }}>
		<TableRowColumn>{currencyName}</TableRowColumn>
		<TableRowColumn>{rate === 0 ? <LinearProgress mode="indeterminate" /> : rate}</TableRowColumn>
		<TableRowColumn>{rate === 0 ? <LinearProgress mode="indeterminate" /> : amount}</TableRowColumn>
		<TableRowColumn>{rate === 0 ? <LinearProgress mode="indeterminate" /> : withdrawFee}</TableRowColumn>
		<TableRowColumn>{rate === 0 ? <LinearProgress mode="indeterminate" /> : afterWithdraw}</TableRowColumn>
		<TableRowColumn>{rate === 0 ? <LinearProgress mode="indeterminate" /> : btcPrice}</TableRowColumn>
		<TableRowColumn>{rate === 0 ? <LinearProgress mode="indeterminate" /> : usdPrice}</TableRowColumn>
	  </TableRow>
	)
}

export default Item
