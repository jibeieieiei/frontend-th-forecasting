import { AutoComplete, ConfigProvider, Select } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import '../../style/search.css'
import trashLogo from '../../assets/trash.svg'
// import '../../assets/'
function Search({ setShowData, setIsForecast }) {
  // ---- useState ----
  const [options, setOptions] = useState([])
  const [number, setNumber] = useState(1)
  const [compare, setCompare] = useState([
    {
      symbol: '',
      timeframe: '',
      model: '',
      strategy: '',
      stopLoss: '',
    },
  ])
  // API Call
  const STOCKS = 'http://127.0.0.1:8000/stocks_symbols'
  const StocksName = () => {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(STOCKS)
          const stocks = response.data.stocks
          const formattedData = stocks.map((item) => ({
            label: item,
            value: item,
          }))
          setOptions(formattedData)
        } catch (error) {
          console.log('Error fetching Data:', error)
        }
      }
      fetchData()
    }, [])
  }
  StocksName()
  // End API Call

  // ---- Handle Function ----
  const handleForecast = (event) => {
    event.preventDefault()
    setShowData(compare)
    setIsForecast(true)
  }

  const handleIncrease = () => {
    if (number < 5) {
      setNumber(number + 1)
      setCompare([
        ...compare,
        {
          symbol: '',
          timeframe: '',
          model: '',
          strategy: '',
          stopLoss: '',
        },
      ])
    }
  }

  const handleDecrease = (event, index) => {
    event.preventDefault()
    console.log('target', event.target)
    const newArray = [...compare]
    newArray.splice(index, 1)
    setCompare(newArray)
    setNumber(number - 1)
    console.log(index)
    showSearch()
  }

  const handleChange = (e) => {
    const { name, value, i } = e

    setCompare((prevCompare) =>
      prevCompare.map((item, index) => {
        if (index === i && name === 'timeframe') {
          return {
            symbol: compare[index].symbol,
            timeframe: value,
            model: compare[index].model,
            strategy: compare[index].strategy,
            stopLoss: compare[index].stopLoss,
          }
        } else if (index === i && name === 'model') {
          return {
            symbol: compare[index].symbol,
            timeframe: compare[index].timeframe,
            model: value,
            strategy: compare[index].strategy,
            stopLoss: compare[index].stopLoss,
          }
        } else if (index === i && name === 'strategy') {
          return {
            symbol: compare[index].symbol,
            timeframe: compare[index].timeframe,
            model: compare[index].model,
            strategy: value,
            stopLoss: compare[index].stopLoss,
          }
        } else if (index === i && name === 'stop-loss') {
          return {
            symbol: compare[index].symbol,
            timeframe: compare[index].timeframe,
            model: compare[index].model,
            strategy: compare[index].strategy,
            stopLoss: value,
          }
        } else {
          return item
        }
      })
    )
  }
  // ---- Function ----
  const changeCompare = (value, i) => {
    setCompare((prevCompare) => {
      return prevCompare.map((item, index) =>
        index === i
          ? {
              symbol: value,
              timeframe: compare[index].timeframe,
              model: compare[index].model,
              strategy: compare[index].strategy,
              stopLoss: compare[index].stopLoss,
            }
          : item
      )
    })
  }

  const showSearch = () => {
    return compare.map((x, i) => (
      <div key={i} className="search-box">
        <style>
          {`
        .rc-virtual-list-scrollbar-thumb{
          background: #FFFFFF !important;
          height: 60px;
        }
        `}
        </style>
        <div className="number">{i + 1}</div>
        <div className="auto-complete">
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  /* here is your component tokens */
                  selectorBg: '#50565E',
                  colorBorder: '#50565E',
                  colorText: '#FFFFFF',
                  colorTextPlaceholder: '#9B9EA3',
                  optionActiveBg: '#9B9EA3',
                  colorBgElevated: '#050D19',
                },
              },
            }}
          >
            <AutoComplete
              style={{
                width: 362,
                height: 48,
                fontSize: 100,
                textAlign: 'start',
                color: '#9B9EA3',
              }}
              placeholder="Type Symbol (Ex. PTTEP)"
              dropdownStyle={{
                width: 362,
                border: '1px solid #ffffff',
              }}
              listHeight={160}
              options={options}
              filterOption={true}
              onSelect={(value) => {
                changeCompare(value, i)
              }}
              onSearch={(value) => {
                changeCompare(value, i)
              }}
              onChange={(value) => {
                changeCompare(value, i)
              }}
              value={compare[i].symbol}
              // open={true}
            />
          </ConfigProvider>
        </div>
        <div className="search-form">
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  /* here is your component tokens */
                  selectorBg: '#050D19',
                  colorBorder: '#FFFFFF',
                  colorText: '#FFFFFF',
                  colorTextPlaceholder: '#9B9EA3',
                  optionActiveBg: '#9B9EA3',
                  colorBgElevated: '#050D19',
                },
              },
            }}
          >
            <Select
              style={{
                width: 260,
                height: 48,
                marginLeft: 46.75,
                borderRadius: 4,
              }}
              onChange={(value, index) => {
                handleChange(index)
              }}
              dropdownStyle={{
                width: 260,
                border: '1px solid #FFFFFF',
                borderRadius: '4px',
              }}
              placeholder="Choose timeframe"
              options={[
                {
                  name: 'timeframe',
                  i: i,
                  value: '15T',
                  label: '15 minutes',
                },
                { name: 'timeframe', i: i, value: '1H', label: '1 hour' },
                { name: 'timeframe', i: i, value: '4H', label: '4 hours' },
                { name: 'timeframe', i: i, value: '1D', label: '1 day' },
              ]}
            />
            <Select
              style={{ width: 260, height: 48, marginLeft: 46.75 }}
              onChange={(value, index) => {
                handleChange(index)
              }}
              dropdownStyle={{
                width: 260,
                border: '1px solid #FFFFFF',
              }}
              placeholder="Choose model"
              options={[
                { name: 'model', i: i, value: 'ARIMA', label: 'ARIMA' },
                { name: 'model', i: i, value: 'LSTM', label: 'LSTM' },
              ]}
            />
            <Select
              style={{ width: 260, height: 48, marginLeft: 46.75 }}
              onChange={(value, index) => {
                handleChange(index)
              }}
              dropdownStyle={{
                width: 260,
                border: '1px solid #FFFFFF',
              }}
              placeholder="Choose strategy"
              options={[
                {
                  name: 'strategy',
                  i: i,
                  value: 'EMACROSS',
                  label: 'EMA Golden Cross',
                },
                { name: 'strategy', i: i, value: 'RSI', label: 'RSI' },
              ]}
            />
            <Select
              style={{ width: 280, height: 48, marginLeft: 46.75 }}
              onChange={(value, index) => {
                handleChange(index)
              }}
              dropdownStyle={{
                width: 280,
                border: '1px solid #FFFFFF',
              }}
              placeholder="Choose Stop Loss/ Take Profit"
              options={[
                {
                  name: 'stop-loss',
                  i: i,
                  value: '0',
                  label: 'No Stop Loss / No Take Profit',
                },
                {
                  name: 'stop-loss',
                  i: i,
                  value: '2',
                  label: 'Stop Loss 2/ Take Profit 4',
                },
                {
                  name: 'stop-loss',
                  i: i,
                  value: '4',
                  label: 'Stop Loss 4/ Take Profit 8',
                },
                {
                  name: 'stop-loss',
                  i: i,
                  value: '6',
                  label: 'Stop Loss 6/ Take Profit 12',
                },
              ]}
            />
          </ConfigProvider>
        </div>
        {i == 0 ? null : (
          <img
            className="delete-button"
            onClick={(event) => handleDecrease(event, i)}
            src={trashLogo}
            width={24}
            height={24}
          />
        )}
      </div>
    ))
  }

  return (
    <div>
      {showSearch()}
      <div className="option-search">
        <button
          className={number === 5 ? 'disable-add' : 'add-compare'}
          onClick={handleIncrease}
        >
          + Compare Stock
        </button>
        <button className="forecast-button" onClick={handleForecast}>
          Forecast
        </button>
      </div>
    </div>
  )
}
Search.propTypes = {
  setShowData: PropTypes.func,
  setIsForecast: PropTypes.func,
}
export default Search
