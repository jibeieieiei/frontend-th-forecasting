import axios from 'axios'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import EChartsReact from 'echarts-for-react'
function BacktestModel({
  model = 'ARIMA',
  tf = '15T',
  symbol = 'ADVANC',
  col = 'Close',
}) {
  // ---- useState ----
  const [testData, setTestData] = useState([])
  const [predictData, setPredictData] = useState([])
  const [date, setDate] = useState([])
  const [mse, setMse] = useState(0)
  //   API Call
  const API_BACKTEST = `http://127.0.0.1:8000/backtest_model_${model}_${tf}_${symbol}_${col}`
  const API_ERROR = `http://127.0.0.1:8000/mse_error_${model}_${tf}_${symbol}`
  const GetBacktest = () => {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(API_BACKTEST)
          const responseError = await axios.get(API_ERROR)
          const data = response.data
          const mseError = responseError.data[0][symbol]
          setTestData(data.map((items) => items[symbol + '_test']))
          setPredictData(data.map((items) => items[symbol + '_predict']))
          setDate([...Array(data.length).keys()])
          setMse(parseFloat(mseError).toFixed(4))
        } catch (error) {
          console.log('Error fetching Data:', error)
        }
      }
      fetchData()
    }, [])
  }
  GetBacktest()
  // ---- Graph ----
  const option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%']
      },
    },
    xAxis: {
      type: 'category',
      data: [...date],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: testData,
        type: 'line',
        smooth: true,
        color: '#A2D08C',
      },
      {
        data: predictData,
        type: 'line',
        smooth: true,
        color: '#56C2EA',
      },
    ],
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        start: 50,
        end: 100,
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
    <div>
      <div className="backtest-tag">Backtest</div>

      <div className="backtest-label">
        <div>Model</div>

        <div className="mse-tag">
          <div className="backtest-dot">
            <span className="test-dot"></span>
            Test Price
            <span className="predict-dot"></span>
            Predict Price
          </div>
          MSE <span>{mse}</span>
        </div>
      </div>
      <EChartsReact option={option} />
    </div>
  )
}

BacktestModel.propTypes = {
  model: PropTypes.string,
  tf: PropTypes.string,
  symbol: PropTypes.string,
  col: PropTypes.string,
}

export default BacktestModel
