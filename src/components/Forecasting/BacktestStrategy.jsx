import axios from 'axios'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import EChartsReact from 'echarts-for-react'

function BacktestStrategy({
  strategy = 'EMACROSS',
  timeframe = '15T',
  symbol = 'ADVANC',
  col = 'Close',
  stopLoss = '2',
  isShow,
}) {
  // ---- useState ----
  const [date, setDate] = useState([])
  //   const [price, setPrice] = useState([])
  const [candleStick, setCandleStick] = useState([])
  const [greenSignal, setGreenSignal] = useState([])
  const [redSignal, setRedSignal] = useState([])
  //   API Call
  const API_STRATEGY = `http://127.0.0.1:8000/backtest_strategy_${strategy}_${timeframe}_${symbol}_${col}_${stopLoss}`
  const GetStrategy = () => {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(API_STRATEGY)
          const data = response.data.filter(
            (obj) => obj[symbol + '_datetime'] !== null
          )
          setCandleStick(
            data.map((item) => [
              item[symbol + '_close'],
              item[symbol + '_open'],
              item[symbol + '_low'],
              item[symbol + '_high'],
            ])
          )
          setDate(data.map((item) => item[symbol + '_datetime']))
          setGreenSignal(data.map((item) => item[symbol + '_green_signal']))
          setRedSignal(data.map((item) => item[symbol + '_red_signal']))
        } catch (error) {
          console.log('Error fetching Data:', error)
        }
      }
      fetchData()
    }, [])
  }
  GetStrategy()
  const option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0] + 20, '20%']
      },
    },
    xAxis: {
      type: 'category',
      data: date,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: candleStick,
        type: 'candlestick',
      },
      {
        data: greenSignal,
        type: 'scatter',
        smooth: true,
        color: '#02FF00',
      },
      {
        data: redSignal,
        type: 'scatter',
        smooth: true,
        color: '#FF0000',
      },
    ],
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        start: 98,
        end: 100,
        backgroundColor: '#373D47',
      },
      {
        type: 'slider',
        show: true,
        yAxisIndex: [0],
        left: '93%',
        start: 100,
        end: 97,
      },
      {
        type: 'inside',
        xAxisIndex: [0],
        start: 70,
        end: 100,
      },
      {
        type: 'inside',
        yAxisIndex: [0],
        start: 100,
        end: 50,
      },
    ],
  }
  return (
    <div className="strategy-charts">
      {isShow && <EChartsReact option={option} />}
    </div>
  )
}
BacktestStrategy.propTypes = {
  strategy: PropTypes.string,
  timeframe: PropTypes.string,
  symbol: PropTypes.string,
  col: PropTypes.string,
  stopLoss: PropTypes.string,
  isShow: PropTypes.bool,
}
export default BacktestStrategy
