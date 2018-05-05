import React from 'react'
import PropTypes from 'prop-types'
import { lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TextField from 'material-ui/TextField'
import './App.css'
import Currencies from './Currencies'
import { fethCurrencies, updateUah } from '../actions'

const App = ({ currencies, updateUah, uah }) => (
	<div className="App">
		<TextField
			value={uah}
			onChange={e => updateUah(e.target.value)}
			floatingLabelText="Enter amount of UAH"
			floatingLabelFixed
			type="number"
		/>
		<Currencies currencies={currencies} />
	</div>
)

export const AppWithData = lifecycle({
	async componentDidMount() {
		const { fethCurrencies, currencies } = this.props
		await fethCurrencies(currencies)
		setInterval(async () => await fethCurrencies(currencies), 15000)
	},
})(App)

const mapStateToProps = state => ({
	currencies: state.currencies,
	uah: state.uah,
})

const mapDispatchToProps = dispatch => ({
	fethCurrencies: bindActionCreators(fethCurrencies, dispatch),
	updateUah: bindActionCreators(updateUah, dispatch),
})

App.propTypes = {
	currencies: PropTypes.array.isRequired,
	fethCurrencies: PropTypes.func.isRequired,
	updateUah: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWithData)
