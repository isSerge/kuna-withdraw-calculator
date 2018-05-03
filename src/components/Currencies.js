import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import { compose, map } from 'ramda'
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
} from 'material-ui/Table'
import Item from './Item'
import { getBestOptionName } from '../utils'
import { columnNames } from '../constants'

const Header = c => <TableHeader displaySelectAll={false} adjustForCheckbox={false}>{c}</TableHeader>
const Row = c => <TableRow>{c}</TableRow>
const HeaderColumn = t => <TableHeaderColumn style={{ whiteSpace: 'pre-wrap' }} key={t}>{t}</TableHeaderColumn>
const renderHeader = compose(Header, Row, map(HeaderColumn))

const Currencies = ({ currencies, uah }) => {
	const bestOptionName = getBestOptionName(currencies, uah)
	const renderItem = x => (
		<Item
			key={uuid.v4()}
			currencyName={x.name}
			rate={x.rate}
			amount={uah / x.rate}
			withdrawFee={x.withdrawFee}
			priceBtc={x.marketPrice.priceBtc}
			priceUsd={x.marketPrice.priceUsd}
			isBestOption={x.name === bestOptionName}
		/>
	)
	const Body = c => <TableBody>{c}</TableBody>
	const renderBody = compose(Body, map(renderItem))

	return (
		<Table>
			{renderHeader(columnNames)}
			{renderBody(currencies.items)}
		</Table>
	)
}

Currencies.propTypes = {
	currencies: PropTypes.object.isRequired,
	uah: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default Currencies