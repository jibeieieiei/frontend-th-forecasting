import PropTypes from 'prop-types'
import PricePredict from './Forecasting/PricePredict'
import BacktestModel from './Forecasting/BacktestModel'
import BacktestStrategy from './Forecasting/BacktestStrategy'
import BacktestListOfTrade from './Forecasting/BacktestListOfTrade'
import BacktestStats from './Forecasting/BacktestStats'
import Background from './Forecasting/Background'
import './../style/stockCompare.css'
import { useState } from 'react'

function StockCompare({
  indexSymbol,
  symbol,
  timeframe,
  model,
  strategy,
  stopLoss,
  maxLength,
}) {
  const [isStrategy, setIsStrategy] = useState(true)
  const handleStrategyClick = () => {
    setIsStrategy(true)
  }
  const handleListOfTradeClick = () => {
    setIsStrategy(false)
  }
  return (
    <div className="stock-info" style={{ width: maxLength > 1 ? 831 : 1706 }}>
      <div className="symbol-header">
        <div className="symbol-name">{symbol}</div>
        <div className="symbol-index">{indexSymbol}</div>
      </div>
      <PricePredict symbol={symbol} timeframe={timeframe} model={model} />
      <BacktestModel symbol={symbol} timeframe={timeframe} model={model} />
      <div className="select-tab-backtest">
        <div
          onClick={handleStrategyClick}
          className={
            isStrategy
              ? 'strategy-lot-button-active'
              : 'strategy-lot-button-inactive'
          }
        >
          Strategy
        </div>
        <div
          onClick={handleListOfTradeClick}
          className={
            !isStrategy
              ? 'strategy-lot-button-active'
              : 'strategy-lot-button-inactive'
          }
        >
          List Of Trade
        </div>
      </div>
      <BacktestStrategy
        symbol={symbol}
        timeframe={timeframe}
        strategy={strategy}
        stopLoss={stopLoss}
        isShow={isStrategy}
      />
      <BacktestListOfTrade
        symbol={symbol}
        timeframe={timeframe}
        strategy={strategy}
        stopLoss={stopLoss}
        maxLength={maxLength}
        isShow={isStrategy}
      />
      <BacktestStats
        symbol={symbol}
        timeframe={timeframe}
        strategy={strategy}
        stopLoss={stopLoss}
      />
      <Background symbol={symbol} />
    </div>
  )
}
StockCompare.propTypes = {
  indexSymbol: PropTypes.string,
  symbol: PropTypes.string,
  timeframe: PropTypes.string,
  model: PropTypes.string,
  strategy: PropTypes.string,
  stopLoss: PropTypes.string,
  maxLength: PropTypes.number,
}
export default StockCompare
