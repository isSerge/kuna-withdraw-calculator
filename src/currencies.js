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
import { isBestOption } from './utils'
import Item from './Item'

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
			{currencies.map(x => (
				<Item
					key={uuid.v4()}
					currencyName={x.name}
					uah={uah}
					rate={x.rate}
					withdrawFee={x.withdraw}
					marketPrice={x.marketPrice}
					isBestOption={isBestOption(x, null)}
				/>
			))}
		</TableBody>
	</Table>
)

Currencies.propTypes = {
	currencies: PropTypes.array.isRequired,
	uah: PropTypes.number.isRequired,
}

export default Currencies