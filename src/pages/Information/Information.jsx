import SelectTab from '../../components/SelectTab'
import '../../style/information.css'
function Information() {
  return (
    <div className="information-page">
      <SelectTab />
      <div className="info-container">
        <div className="arima-container">
          <div className="arima-header">ARIMA MODEL</div>
          <div className="arima-info">
            {`An autoregressive integrated moving average, or ARIMA, is a statistical analysis model that uses time series data to either better understand the data set or to predict future trends. 
  A statistical model is autoregressive if it predicts future values based on past values. For example, an ARIMA model might seek to predict a stock's future prices based on its past performance or forecast a company's earnings based on past periods.`}
            {/* <a href="https://www.investopedia.com/terms/a/autoregressive-integrated-moving-average-arima.asp#:~:text=An%20autoregressive%20integrated%20moving%20average%2C%20or%20ARIMA%2C%20is%20a%20statistical,values%20based%20on%20past%20values.">
              Learn More
            </a> */}
          </div>
        </div>
        <div className="lstm-container">
          <div className="lstm-header">LSTM MODEL</div>
          <div className="lstm-info">
            {`LSTM (Long Short-Term Memory) is a recurrent neural network (RNN) architecture widely used in Deep Learning. It excels at capturing long-term dependencies, making it ideal for sequence prediction tasks.
Unlike traditional neural networks, LSTM incorporates feedback connections, allowing it to process entire sequences of data, not just individual data points. This makes it highly effective in understanding and predicting patterns in sequential data like time series, text, and speech.`}
          </div>
        </div>
        <div className="rsi-container">
          <div className="rsi-header">RSI INDICATOR</div>
          <div className="rsi-info">
            {`The relative strength index (RSI) measures the price momentum of a stock or other security. The basic idea behind the RSI is to measure how quickly traders are bidding the price of the security up or down. The RSI plots this result on a scale of 0 to 100.
Readings below 30 generally indicate that the stock is oversold, while readings above 70 indicate that it is overbought. Traders will often place this RSI chart below the price chart for the security, so they can compare its recent momentum against its market price.`}
          </div>
        </div>
        <div className="ema-container">
          <div className="ema-header">EMA INDICATOR</div>
          <div className="ema-info">
            {`An exponential moving average (EMA) is a type of moving average (MA) that places a greater weight and significance on the most recent data points.
 The exponential moving average is also referred to as the exponentially weighted moving average. An exponentially weighted moving average reacts more significantly to recent price changes than a simple moving average simple moving average (SMA), which applies an equal weight to all observations in the period.`}
          </div>
        </div>
        <div className="macd-container">
          <div className="macd-header">MACD INDICATOR</div>
          <div className="macd-info">
            {`Moving average convergence/divergence (MACD) is a technical indicator to help investors identify price trends, measure trend momentum, and identify market entry points for buying or selling. Moving average convergence/divergence (MACD) is a trend-following momentum indicator that shows the relationship between two exponential moving averages (EMAs) of a security’s price. MACD was developed in the 1970s by Gerald Appel`}
          </div>
        </div>
        <div className="adx-container">
          <div className="adx-header">ADX INDICATOR</div>
          <div className="adx-info">
            {`The Average Directional Index (or ADX indicator) is a technical tool designed to measure the strength of a market trend. The ADX indicator is used for various purposes, such as measuring trend strength, as a trend and range finder, and as a filter for different Forex trading strategies.`}
          </div>
        </div>
        <div className="bbands-container">
          <div className="bbands-header">BOLLINGER BANDS INDICATOR</div>
          <div className="bbands-info">
            {`A Bollinger Band® is a technical analysis tool defined by a set of trendlines. They are plotted as two standard deviations, both positively and negatively, away from a simple moving average (SMA) of a security's price and can be adjusted to user preferences. Bollinger Bands® was developed by technical trader John Bollinger and designed to give investors a higher probability of identifying when an asset is oversold or overbought.`}
          </div>
        </div>
        <div className="bh-container">
          <div className="bh-header">BUY AND HOLD</div>
          <div className="bh-info">{`Buy stocks at the beginning of the year and sell them at the end of the year.`}</div>
        </div>
        <div className="sto-container">
          <div className="sto-header">STOCHASTIC INDICATOR</div>
          <div className="sto-info">
            {`A stochastic oscillator is a momentum indicator comparing a particular closing price of a security to a range of its prices over a certain period of time. The sensitivity of the oscillator to market movements is reducible by adjusting that time period or by taking a moving average of the result. It is used to generate overbought and oversold trading signals, utilizing a 0–100 bounded range of values.`}
          </div>
        </div>
        <div className="tsl-container">
          <div className="tsl-header">TRAILING STOP LOSS</div>
          <div className="tsl-info">{`A trailing stop is a modification of a typical stop order that can be set at a defined percentage or dollar amount away from a security's current market price. For a long position, an investor places a trailing stop loss below the current market price. For a short position, an investor places the trailing stop above the current market price.`}</div>
        </div>
      </div>
    </div>
  )
}

export default Information
