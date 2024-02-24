import { useState } from 'react'
import SelectTab from '../../components/SelectTab'
import Search from '../../components/Forecasting/Search'
import StockCompare from '../../components/StockCompare'
import '../../style/forecasting.css'
function Forecasting() {
  // ---- useState ----
  const [showData, setShowData] = useState([])
  const [isForecast, setIsForecast] = useState(false)
  console.log('Forecast Pages', showData)
  const compare = () => {
    console.log(
      'ShowData in Compare',
      showData.map((item) => {
        console.log(item)
      })
    )
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
          symbol={item.symbol}
          timeframe={item.timeframe}
          model={item.model}
          strategy={item.strategy}
          stopLoss={item.stopLoss}
        />
      </div>
    ))
  }
  return (
    <div className="forecasting-page">
      <SelectTab />
      <Search setShowData={setShowData} setIsForecast={setIsForecast} />
      {isForecast && compare()}
    </div>
  )
}

export default Forecasting
