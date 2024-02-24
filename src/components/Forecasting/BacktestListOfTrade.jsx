import axios from 'axios'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'

function BacktestListOfTrade({
  symbol = 'ADVANC',
  strategy = 'EMACROSS',
  col = 'Close',
  timeframe = '15T',
  stopLoss = '2',
}) {
  // useState
  const [history, setHistory] = useState([])
  // API Call
  const API_STRATEGY = `http://127.0.0.1:8000/trade_history_${symbol}_${strategy}_${col}_${timeframe}_${stopLoss}`
  const GetStrategy = () => {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(API_STRATEGY)
          const data = response.data.filter(
            (obj) => obj[symbol + '_direction'] !== null
          )
          //   const data = response.data
          console.log(data)
          setHistory(data)
          //   setCandleStick(
          //     data.map((item) => [
          //       item[symbol + '_close'],
          //       item[symbol + '_open'],
          //       item[symbol + '_low'],
          //       item[symbol + '_high'],
          //     ])
          //   )
          //   setPrice(data.map((item) => item[symbol + '_close']))
          //   setDate(data.map((item) => item[symbol + '_datetime']))
          //   setGreenSignal(data.map((item) => item[symbol + '_green_signal']))
          //   setRedSignal(data.map((item) => item[symbol + '_red_signal']))
          //   setDate([...Array(data.length).keys()])
        } catch (error) {
          console.log('Error fetching Data:', error)
        }
      }
      fetchData()
    }, [])
  }
  GetStrategy()
  // Function
  const value = history.map((item, i) => (
    <tr
      key={
        i +
        item[symbol + '_direction'] +
        item[symbol + '_fees'] +
        item[symbol + '_pnl'] +
        item[symbol + '_price'] +
        item[symbol + '_return'] +
        item[symbol + '_side'] +
        item[symbol + '_signal_index'] +
        item[symbol + '_status'] +
        item[symbol + '_stop_type']
      }
    >
      <td>{item[symbol + '_direction']}</td>
      <td>{item[symbol + '_fees']}</td>
      <td>{item[symbol + '_pnl']}</td>
      <td>{item[symbol + '_price']}</td>
      <td>{item[symbol + '_return']}</td>
      <td>{item[symbol + '_side']}</td>
      <td>{item[symbol + '_signal_index']}</td>
      <td>{item[symbol + '_status']}</td>
      <td>{item[symbol + '_stop_type']}</td>
    </tr>
  ))
  return (
    <div>
      BacktestListOfTrade
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Direction</th>
            <th>Fees</th>
            <th>PnL</th>
            <th>Price</th>
            <th>Return</th>
            <th>Side</th>
            <th>Signal Index</th>
            <th>Status</th>
            <th>Stop Type</th>
          </tr>
        </thead>
        <tbody>{value}</tbody>
      </Table>
    </div>
  )
}
BacktestListOfTrade.propTypes = {
  strategy: PropTypes.string,
  timeframe: PropTypes.string,
  symbol: PropTypes.string,
  col: PropTypes.string,
  stopLoss: PropTypes.string,
}
export default BacktestListOfTrade
