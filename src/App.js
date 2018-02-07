import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import LinearProgress from 'material-ui/LinearProgress';
import './App.css';

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

class App extends Component {
  constructor(props) {
    super(props);

    this.handleValueChange = this.handleValueChange.bind(this)
    this.getKuna = this.getKuna.bind(this)
    this.getMarket = this.getMarket.bind(this)
    this.getBestOption = this.getBestOption.bind(this)
    this.isBestOption = this.isBestOption.bind(this)

    this.state = {
      uah: 1000,
      currencies: [
        {
          name: 'eth',
          cmc: 'ethereum',
          rate: 0,
          withdraw: 0.005,
          marketPrice: {
            priceBtc: 0,
            priceUsd: 0
          },
        },
        {
          name: 'btc',
          cmc: 'bitcoin',
          rate: 0,
          withdraw: 0.001,
          marketPrice: {
            priceBtc: 0,
            priceUsd: 0
          },
        },
        {
          name: 'waves',
          cmc: 'waves',
          rate: 0,
          withdraw: 0.01,
          marketPrice: {
            priceBtc: 0,
            priceUsd: 0
          },
        },
        {
          name: 'bch',
          cmc: 'bitcoin-cash',
          rate: 0,
          withdraw: 0.001,
          marketPrice: {
            priceBtc: 0,
            priceUsd: 0
          },
        },
        {
          name: 'gbg',
          cmc: 'golos-gold',
          rate: 0,
          withdraw: 0,
          marketPrice: {
            priceBtc: 0,
            priceUsd: 0
          },
        },
        {
          name: 'xrp',
          cmc: 'ripple',
          rate: 0,
          withdraw: 0.02,
          marketPrice: {
            priceBtc: 0,
            priceUsd: 0
          },
        }
      ]
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.getKuna()
      this.getMarket()
    }, 5000)
  }

  getBestOption () {
    const arr = this.state.currencies.map(x => ({
      name: x.name,
      final: (x.marketPrice.priceBtc * ((this.state.uah / x.rate) - x.withdraw))
    }))

    return arr.sort((a, b) => a.final < b.final)[0].name
  }

  isBestOption (x) {
    return x.name === this.getBestOption()
  }

  getMarket() {
    const url = 'https://api.coinmarketcap.com/v1/ticker'
    const requests = this.state.currencies.map(x =>
      axios.get(`${url}/${x.cmc}/`).then(r => ({
        priceBtc: r.data[0].price_btc,
        priceUsd: r.data[0].price_usd,
      })))

    Promise.all(requests)
      .then(values => this.setState(this.state.currencies.map((x, i) => x.marketPrice = values[i])))
  }

  getKuna() {
    const url = 'https://kuna.io/api/v2/tickers'
    const requests = this.state.currencies.map(x =>
      axios.get(`${url}/${x.name}uah/`).then(r => r.data.ticker.sell))

    Promise.all(requests)
      .then(values => this.setState(this.state.currencies.map((x, i) => x.rate = values[i])))
  }

  handleValueChange (e) {
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
                key={x.name}
                currencyName={x.name}
                uah={this.state.uah}
                rate={x.rate}
                withdrawFee={x.withdraw}
                marketPrice={x.marketPrice}
                isBestOption={this.isBestOption(x)}
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
    );
  }
}

export default App;
