import React, { Component } from 'react'
import axios from 'axios'
import TextField from 'material-ui/TextField'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table'
import uuid from 'uuid'
import './App.css'
import Item from './Item'
import currencies from './currencies'
import { isBestOption } from './utils'

class App extends Component {
  state = {
    uah: 1000,
    currencies,
  }

  componentDidMount() {
    this.getKuna()
    this.getMarket()
    
    setInterval(() => {
      this.getKuna()
      this.getMarket()
    }, 5000)
  }

  getMarket = () => {
    const url = 'https://api.coinmarketcap.com/v1/ticker'
    const requests = this.state.currencies.map(x =>
      axios.get(`${url}/${x.cmc}/`).then(r => ({
        priceBtc: r.data[0].price_btc,
        priceUsd: r.data[0].price_usd,
      })))

    Promise.all(requests)
      .then(values => this.setState(this.state.currencies.map((x, i) => x.marketPrice = values[i])))
  }

  getKuna = () => {
    const url = 'https://kuna.io/api/v2/tickers'
    const requests = this.state.currencies.map(x =>
      axios.get(`${url}/${x.kunaName}uah/`).then(r => r.data.ticker.sell))

    Promise.all(requests)
      .then(values => this.setState(this.state.currencies.map((x, i) => x.rate = values[i])))
  }

  handleValueChange = (e) => {
    this.setState({
      uah: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>currency</TableHeaderColumn>
              <TableHeaderColumn>KUNA rate</TableHeaderColumn>
              <TableHeaderColumn>amount</TableHeaderColumn>
              <TableHeaderColumn>withdraw fee</TableHeaderColumn>
              <TableHeaderColumn style={{ whiteSpace: 'wrap'}}>amount after withdraw</TableHeaderColumn>
              <TableHeaderColumn>BTC price</TableHeaderColumn>
              <TableHeaderColumn>USD price</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
          {
            this.state.currencies.map(x => (
              <Item
                key={uuid.v4()}
                currencyName={x.name}
                uah={this.state.uah}
                rate={x.rate}
                withdrawFee={x.withdraw}
                marketPrice={x.marketPrice}
                isBestOption={isBestOption(x, this.state)}
              />
            ))
          }
          </TableBody>
        </Table>
        <TextField
          value={this.state.uah}
          onChange={this.handleValueChange}
          floatingLabelText="Enter amount of UAH"
          floatingLabelFixed
        />
      </div>
    )
  }
}

export default App
