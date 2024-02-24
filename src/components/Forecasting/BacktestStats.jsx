import axios from 'axios'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'

function BacktestStats({
  strategy = 'EMACROSS',
  timeframe = '15T',
  symbol = 'ADVANC',
  col = 'Close',
  stopLoss = '2',
}) {
  // ---- useState ----
  const [stats, setStats] = useState([])
  //   API Call
  const API_STATS = `http://127.0.0.1:8000/backtest_stats_${strategy}_${timeframe}_${symbol}_${col}_${stopLoss}`
  const GetStats = () => {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(API_STATS)
          const data = response.data
          setStats(data)
        } catch (error) {
          console.log('Error fetching Data:', error)
        }
      }
      fetchData()
    }, [])
  }
  GetStats()

  // ---- Function ----
  const value = stats.map((item) => (
    <tr key={item.index + item[symbol + '_stats']}>
      <td>{item.index}</td>
      <td>{item[symbol + '_stats']}</td>
    </tr>
  ))

  return (
    <div>
      BacktestStats
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>{symbol} Stats</th>
          </tr>
        </thead>
        <tbody>{value}</tbody>
      </Table>
    </div>
  )
}
BacktestStats.propTypes = {
  strategy: PropTypes.string,
  timeframe: PropTypes.string,
  symbol: PropTypes.string,
  col: PropTypes.string,
  stopLoss: PropTypes.string,
}
export default BacktestStats
