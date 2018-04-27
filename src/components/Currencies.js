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
			{currencies.items.map(x => (
				<Item
					key={uuid.v4()}
					currencyName={x.name}
					uah={uah}
					rate={x.rate}
					withdrawFee={x.withdraw}
					marketPrice={x.marketPrice}
					isBestOption={isBestOption(x, null)}
					isFetching={currencies.isFetching}
				/>
			))}
		</TableBody>
	</Table>
)

Currencies.propTypes = {
	currencies: PropTypes.object.isRequired,
	uah: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default Currencies