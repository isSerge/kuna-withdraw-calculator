import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
} from 'material-ui/Table'
import Item from './Item'
import { isBestOption } from '../utils'

const Currencies = ({ currencies, uah }) => (
	<Table>
		<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
			<TableRow>
				<TableHeaderColumn>Currency</TableHeaderColumn>
				<TableHeaderColumn>KUNA rate</TableHeaderColumn>
				<TableHeaderColumn>Amount</TableHeaderColumn>
				<TableHeaderColumn>Withdraw fee</TableHeaderColumn>
				<TableHeaderColumn>Amount after withdraw</TableHeaderColumn>
				<TableHeaderColumn>BTC price</TableHeaderColumn>
				<TableHeaderColumn>USD price</TableHeaderColumn>
			</TableRow>
		</TableHeader>
		<TableBody>
			{currencies.items.map(x => {
				const amount = (uah / x.rate).toFixed(5)
				const afterWithdrawAmount = (amount - x.withdraw).toFixed(5)
				const btcPrice = (x.marketPrice.priceBtc * afterWithdrawAmount).toFixed(5)
				const usdPrice = (x.marketPrice.priceUsd * afterWithdrawAmount).toFixed(2)
				return (
					<Item
						key={uuid.v4()}
						currencyName={x.name}
						rate={x.rate}
						amount={amount}
						withdrawFee={x.withdraw}
						afterWithdraw={afterWithdrawAmount}
						btcPrice={btcPrice}
						usdPrice={usdPrice}
						isBestOption={isBestOption(x, null)}
					/>
				)
			})}
		</TableBody>
	</Table>
)

Currencies.propTypes = {
	currencies: PropTypes.object.isRequired,
	uah: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default Currencies