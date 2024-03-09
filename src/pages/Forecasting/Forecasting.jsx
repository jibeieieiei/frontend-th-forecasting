import { useEffect, useState } from 'react'
import SelectTab from '../../components/SelectTab'
import Search from '../../components/Forecasting/Search'
import StockCompare from '../../components/StockCompare'
import '../../style/forecasting.css'
import CompareTable from '../../components/Forecasting/CompareTable'
function Forecasting() {
  // ---- useState ----
  const [showData, setShowData] = useState([])
  const [isForecast, setIsForecast] = useState(false)
  console.log('showData', showData)
  useEffect(() => {
    const data = localStorage.getItem('compare')
    if (data === null) {
      localStorage.setItem(
        'compare',
        JSON.stringify([
          {
            symbol: '',
            timeframe: '',
            model: '',
            strategy: '',
            stopLoss: '',
          },
        ])
      )
    }
  }, [])
  // ---- Function ----
  const compareTable = () => {
    const symbolOnly = showData.map((item) => item.symbol)
    return (
      <div>
        <CompareTable props={symbolOnly} />
      </div>
    )
  }
  const compare = () => {
    return showData.map((item, i) => (
      <div
        key={
          item.symbol +
          item.timeframe +
          item.model +
          item.strategy +
          item.stopLoss +
          i
        }
      >
        <StockCompare
          indexSymbol={(i + 1).toString()}
          symbol={item.symbol}
          timeframe={item.timeframe}
          model={item.model}
          strategy={item.strategy}
          stopLoss={item.stopLoss}
          maxLength={showData.length}
        />
      </div>
    ))
  }
  return (
    <div className="forecasting-page">
      <SelectTab />
      <Search setShowData={setShowData} setIsForecast={setIsForecast} />
      {isForecast && compareTable()}
      {isForecast && (
        <div
          className={
            showData.length === 1
              ? 'stock-compare-block'
              : 'stock-compare-multi'
          }
        >
          {compare()}
        </div>
      )}
    </div>
  )
}

export default Forecasting
