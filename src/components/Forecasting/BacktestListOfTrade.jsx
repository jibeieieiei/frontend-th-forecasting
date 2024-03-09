import axios from 'axios'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ConfigProvider, Table } from 'antd'

function BacktestListOfTrade({
  symbol = 'ADVANC',
  strategy = 'EMACROSS',
  col = 'Close',
  timeframe = '15T',
  stopLoss = '2',
  maxLength,
  isShow,
}) {
  // useState
  const [history, setHistory] = useState([])
  const columns = [
    {
      title: () => {
        return <div style={{ width: 67 }}> Direction </div>
      },
      dataIndex: 'direction',
      key: 'direction',
    },
    {
      title: 'Fees',
      dataIndex: 'fees',
      key: 'fees',
    },
    {
      title: 'PnL',
      dataIndex: 'pnl',
      key: 'pnl',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render(text) {
        return {
          props: {
            style: {
              padding: 10,
            },
          },
          children: <div>{text}</div>,
        }
      },
    },
    {
      title: () => {
        return <div style={{ width: 50 }}> Return </div>
      },
      dataIndex: 'return',
      key: 'return',
    },
    {
      title: 'Side',
      dataIndex: 'side',
      key: 'side',
      render(text) {
        return {
          props: {
            style: {
              color: text === 'Buy' ? '#ACCDFF' : '#3083FF',
            },
          },
          children: <div>{text}</div>,
        }
      },
    },
    {
      title: () => {
        return (
          <div style={{ position: 'relative', right: 16, width: 50 }}>
            {' '}
            Signal Index{' '}
          </div>
        )
      },
      dataIndex: 'signal_index',
      key: 'signal_index',
      render(text) {
        return {
          props: {
            style: {
              // display: 'flex',
              // overflowX: 'scroll',
              fontSize: 13,
              padding: 0,
              position: 'relative',
              // marginBottom: 20,
              // left: 10,
            },
          },
          children: <div>{text.replace('+07:00', '')}</div>,
        }
      },
    },
    {
      title: () => {
        return <div style={{ width: 50 }}> Status </div>
      },
      dataIndex: 'status',
      key: 'status',
      render(text) {
        return {
          props: {
            style: {
              padding: 15,
            },
          },
          children: <div>{text}</div>,
        }
      },
    },
    {
      title: 'Stop Type',
      dataIndex: 'stop_type',
      key: 'stop_type',
    },
  ]
  // API Call
  const API_STRATEGY = `http://127.0.0.1:8000/trade_history_${symbol}_${strategy}_${col}_${timeframe}_${stopLoss}`
  const GetStrategy = () => {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(API_STRATEGY)
          const data = response.data.filter(
            (obj) => obj[symbol + '_direction'] !== null
          )
          const dataTemp = data.map((item, i) => {
            const local = {
              key: i + 1,
              direction: item[symbol + '_direction'],
              fees: item[symbol + '_fees'],
              pnl: item[symbol + '_pnl'].toFixed(2),
              price: item[symbol + '_price'].toFixed(2),
              return: item[symbol + '_return'].toFixed(2),
              side: item[symbol + '_side'],
              signal_index: item[symbol + '_signal_index'],
              status: item[symbol + '_status'],
              stop_type: item[symbol + '_stop_type'],
            }
            return local
          })
          setHistory(dataTemp)
        } catch (error) {
          console.log('Error fetching Data:', error)
        }
      }
      fetchData()
    }, [])
  }
  GetStrategy()

  return (
    <div className="lot-table">
      {!isShow && (
        <ConfigProvider
          theme={{
            components: {
              Table: {
                colorBgContainer: '#1E2530',
                colorText: '#ffffff',
                colorTextHeading: '#50565E',
              },
            },
            token: {
              lineWidth: 0,
            },
          }}
        >
          <div className={maxLength > 1 ? 'line-col-multi' : 'line-col'}>
            {' '}
            _
          </div>
          <Table
            dataSource={history}
            columns={columns}
            style={{
              marginBottom: 20,
              width: 'calc(100%/1.22)',
              marginLeft: 'calc(100% / 11.87)',
              marginRight: 'calc(100% / 9.98)',
              minHeight: 376,
              marginTop: 32,
              borderRadius: 8,
            }}
            scroll={{ y: 300 }}
            pagination={false}
          />
        </ConfigProvider>
      )}
    </div>
  )
}
BacktestListOfTrade.propTypes = {
  strategy: PropTypes.string,
  timeframe: PropTypes.string,
  symbol: PropTypes.string,
  col: PropTypes.string,
  stopLoss: PropTypes.string,
  isShow: PropTypes.bool,
  maxLength: PropTypes.number,
}
export default BacktestListOfTrade
