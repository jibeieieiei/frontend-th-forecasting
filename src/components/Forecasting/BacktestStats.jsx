import axios from 'axios'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import '../../style/statistics.css'

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
  const isInteger = (index) => {
    switch (index) {
      case 'Start':
      case 'End':
      case 'Period':
      case 'Total Orders':
      case 'Total Trades':
        return true
      default:
        return false
    }
  }
  const value = stats.map((item) => (
    <div key={item.index + item[symbol + '_stats']} className="stats-content">
      <div className="stats-index">{item.index}</div>
      <div>
        {isInteger(item.index)
          ? item[symbol + '_stats'].replace('.00', '')
          : item[symbol + '_stats']}
      </div>
    </div>
  ))

  return (
    <div className="statistics">
      <div className="stats-header">Statistics</div>
      <div className="stats-body">{value}</div>
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
