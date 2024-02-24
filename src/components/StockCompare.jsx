import PropTypes from 'prop-types'
import PricePredict from './Forecasting/PricePredict'
import BacktestModel from './Forecasting/BacktestModel'
import BacktestStrategy from './Forecasting/BacktestStrategy'
import BacktestListOfTrade from './Forecasting/BacktestListOfTrade'
import BacktestStats from './Forecasting/BacktestStats'
import Background from './Forecasting/Background'
function StockCompare({ symbol, timeframe, model, strategy, stopLoss }) {
  return (
    <div>
      <PricePredict symbol={symbol} timeframe={timeframe} model={model} />
      <BacktestModel symbol={symbol} timeframe={timeframe} model={model} />
      <BacktestStrategy
        symbol={symbol}
        timeframe={timeframe}
        strategy={strategy}
        stopLoss={stopLoss}
      />
      <BacktestListOfTrade
        symbol={symbol}
        timeframe={timeframe}
        strategy={strategy}
        stopLoss={stopLoss}
      />
      <BacktestStats
        symbol={symbol}
        timeframe={timeframe}
        strategy={strategy}
        stopLoss={stopLoss}
      />
      <Background symbol={symbol} />
      StockCompare
    </div>
  )
}
StockCompare.propTypes = {
  symbol: PropTypes.string,
  timeframe: PropTypes.string,
  model: PropTypes.string,
  strategy: PropTypes.string,
  stopLoss: PropTypes.string,
}
export default StockCompare
