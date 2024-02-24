import { useState } from 'react'
import PricePredict from '../../../Forecasting/PricePredict'
import { useLocation } from 'react-router-dom'
import BacktestModel from '../../components/Prediction/BacktestModel'
// import BacktestModel from '../../components/Prediction/BacktestModel'

function Prediction() {
  // ---- useLocation ----
  const location = useLocation()
  const symbol = location.state.symbol

  // ---- useState ----
  const [formData, setFormData] = useState({
    timeframe: '15T',
    model: 'ARIMA',
    strategy: 'EMACROSS',
  })
  const [result, setResult] = useState({
    timeframe: '',
    model: '',
    strategy: '',
  })
  const [isFirstShow, setIsFirstShow] = useState(true)
  // ---- Handle Function ----
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    setIsFirstShow(false)
    setResult(formData)
  }
  // ---- Function ----
  const lastGraph = () => {
    if (isFirstShow) {
      return <PricePredict symbol={symbol} />
    } else {
      return (
        <PricePredict
          key={result.model + result.timeframe + symbol}
          model={result.model}
          tf={result.timeframe}
          strategy={result.strategy}
          symbol={symbol}
        />
      )
    }
  }

  return (
    <div>
      Prediction
      <form onSubmit={handleSubmit}>
        <div>{symbol}</div>
        Timeframe
        <br />
        <select name="timeframe" id="select-prediction" onChange={handleChange}>
          {/* <option value="15T">Select a timeframe</option> */}
          <option value="15T">15 minutes</option>
          <option value="1H">1 hour</option>
          <option value="4H">4 hours</option>
          <option value="1D">1 day</option>
        </select>
        <br />
        Model
        <br />
        <select name="model" id="select-prediction" onChange={handleChange}>
          {/* <option value="ARIMA">Select a model</option> */}
          <option value="ARIMA">ARIMA</option>
          <option value="LSTM">LSTM</option>
        </select>
        <br />
        Strategy
        <br />
        <select name="strategy" id="select-prediction" onChange={handleChange}>
          {/* <option value="EMACROSS">Select a strategy</option> */}
          <option value="EMACROSS">EMA CROSS</option>
          <option value="RSI">RSI</option>
        </select>
        <br />
        <input type="submit" />
      </form>
      {lastGraph()}
      {/* <BacktestModel model={model} tf={tf} symbol={symbol} col={col} /> */}
      {/* <BacktestModel /> */}
    </div>
  )
}

export default Prediction
