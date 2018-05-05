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
import { columnNames } from '../constants'

const Header = c => <TableHeader displaySelectAll={false} adjustForCheckbox={false}>{c}</TableHeader>
const Row = c => <TableRow>{c}</TableRow>
const HeaderColumn = t => <TableHeaderColumn style={{ whiteSpace: 'pre-wrap' }} key={t}>{t}</TableHeaderColumn>
const renderHeader = compose(Header, Row, map(HeaderColumn))

const renderItem = x => <Item key={uuid.v4()} {...x}/>
const Body = c => <TableBody>{c}</TableBody>
const renderBody = compose(Body, map(renderItem))

const Currencies = ({ currencies }) =><Table>{renderHeader(columnNames)}{renderBody(currencies)}</Table>

Currencies.propTypes = {
	currencies: PropTypes.array.isRequired,
}

export default Currencies