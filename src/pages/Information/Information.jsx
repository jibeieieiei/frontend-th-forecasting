import SelectTab from '../../components/SelectTab'
import '../../style/information.css'
function Information() {
  const arimaInfo = `An autoregressive integrated moving average, or ARIMA, is a statistical analysis model that uses time series data to either better understand the data set or to predict future trends. 
    A statistical model is autoregressive if it predicts future values based on past values. For example, an ARIMA model might seek to predict a stock's future prices based on its past performance or forecast a company's earnings based on past periods.`
  return (
    <div className="information-page">
      <SelectTab />
      Information
      <div>
        ARIMA
        {arimaInfo}
      </div>
    </div>
  )
}

export default Information
