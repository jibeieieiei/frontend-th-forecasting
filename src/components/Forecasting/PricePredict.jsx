import axios from 'axios'
import { useEffect, useState } from 'react'
import EChartsReact from 'echarts-for-react'
import PropTypes from 'prop-types'
function PricePredict({
  model = 'ARIMA',
  timeframe = '15T',
  symbol = 'ADVANC',
  col = 'Close',
  // strategy = 'EMACROSS',
  // stopLoss = '2',
}) {
  // ---- useState ----
  const [actualPrice, setActualPrice] = useState([])
  const [predictPrice, setPredictPrice] = useState([])
  const [date, setDate] = useState([])
  const [nullArray, setNullArray] = useState([])
  // API Call
  const API = `http://127.0.0.1:8000/prediction_${model}_${timeframe}_${symbol}_${col}`
  const GetPrice = () => {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(API)
          const data = response.data
          setActualPrice(data.slice(0, -10).map((item) => item[symbol]))
          setPredictPrice(data.slice(-10).map((item) => item[symbol]))
          setDate(data.map((item) => item['datetime']))
          setNullArray(new Array(data.length - 10).fill(null))
        } catch (error) {
          console.log('Error fetching Data:', error)
        }
      }
      fetchData()
    }, [])
  }
  GetPrice()

  const option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%']
      },
    },
    xAxis: {
      type: 'category',
      data: [...date, '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [...nullArray, ...predictPrice],
        type: 'line',
        smooth: true,
      },
      {
        data: actualPrice,
        type: 'line',
        smooth: true,
      },
    ],
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        start: 99,
        end: 100,
      },
      {
        type: 'slider',
        show: true,
        yAxisIndex: [0],
        left: '93%',
        start: 100,
        end: 80,
      },
      {
        type: 'inside',
        xAxisIndex: [0],
        start: 90,
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
    <div>
      <EChartsReact option={option} />
    </div>
  )
}
PricePredict.propTypes = {
  model: PropTypes.string,
  timeframe: PropTypes.string,
  symbol: PropTypes.string,
  col: PropTypes.string,
}

export default PricePredict
