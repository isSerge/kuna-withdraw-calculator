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

const headerColumnStyle = {
	whiteSpace: 'pre-wrap',
}

const Currencies = ({ currencies, uah }) => (
	<Table>
		<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
			<TableRow>
				<TableHeaderColumn style={headerColumnStyle}>Currency</TableHeaderColumn>
				<TableHeaderColumn style={headerColumnStyle}>KUNA rate</TableHeaderColumn>
				<TableHeaderColumn style={headerColumnStyle}>Amount</TableHeaderColumn>
				<TableHeaderColumn style={headerColumnStyle}>Withdraw fee</TableHeaderColumn>
				<TableHeaderColumn style={headerColumnStyle}>Amount after withdraw</TableHeaderColumn>
				<TableHeaderColumn style={headerColumnStyle}>BTC amount</TableHeaderColumn>
				<TableHeaderColumn style={headerColumnStyle}>USD amount</TableHeaderColumn>
			</TableRow>
		</TableHeader>
		<TableBody>
			{currencies.items.map(x => (
				<Item
					key={uuid.v4()}
					currencyName={x.name}
					rate={x.rate}
					amount={uah / x.rate}
					withdrawFee={x.withdrawFee}
					priceBtc={x.marketPrice.priceBtc}
					priceUsd={x.marketPrice.priceUsd}
					isBestOption={isBestOption(x, currencies, uah)}
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