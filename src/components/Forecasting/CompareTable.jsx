import axios from 'axios'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ConfigProvider, Table } from 'antd'
import '../../style/compareTable.css'
import categoryLogo from '../../assets/category.svg'
import rightLogo from '../../assets/right.svg'
function CompareTable(props) {
  const symbols = props.props
  // ---- useState ----
  const [modal, setModal] = useState(false)
  const [data, setData] = useState()

  const columns = [{ title: '   ', dataIndex: 'title', key: 'title' }].concat(
    symbols.map((item) => ({
      title: item,
      dataIndex: item.toLowerCase(),
      key: item.toLowerCase(),
    }))
  )
  // Column Name
  const columnName = ['title'].concat(symbols.map((item) => item))
  // ---- Function ----
  const toggleModal = () => {
    setModal(!modal)
  }
  // ---- API Call ----
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all(
          [symbols[0]].concat(symbols).map(async (symbol, i) => {
            const API = `http://127.0.0.1:8000/trading_stats_compare_${symbol}`
            const response = await axios.get(API)
            const elementData = await response.data
            if (i === 0) {
              return elementData.map((item) => item.index)
            } else {
              return elementData.map((item) => item[symbol + '_fund'])
            }
          })
        )
        // ---- Prepare Data ----
        let arrayData = []
        for (let i = 0; i < results[0].length; i++) {
          const tempColumn = ['key'].concat(columnName) // ['key', 'title', 'stocks1', ..]
          const tempData = Object.fromEntries(
            tempColumn.map((key, index) => {
              if (key === 'key') {
                return [key, i]
              } else {
                return [key.toLowerCase(), results[index - 1][i]]
              }
            })
          )
          arrayData = arrayData.concat(tempData)
        }
        setData(arrayData)
      } catch (error) {
        console.log('Error fetching Data:', error)
      }
    }
    fetchData()
    // console.log('hhleo')
  }, [symbols]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="compare-table">
      {!modal && (
        <div className="button-compare" onClick={toggleModal}>
          <img src={categoryLogo} width={24} height={24} />
          <button style={{ width: 118, height: 24 }}>Compare Table</button>
        </div>
      )}
      {modal && (
        <div className="table-stock-compare">
          <div className="button-compare-back" onClick={toggleModal}>
            <img src={rightLogo} width={20} height={20} />
          </div>
          <div className="table-stock">
            <ConfigProvider
              theme={{
                components: {
                  Table: {
                    colorBgContainer: '#050D19',
                    colorText: '#ffffff',
                    colorTextHeading: '#ffffff',
                    footerColor: '#000000',
                  },
                },
                token: {
                  colorPrimary: '#000000',
                  colorText: '#FFFFFF',
                  lineWidth: 0,
                },
              }}
            >
              <Table columns={columns} dataSource={data} />
            </ConfigProvider>
          </div>
        </div>
      )}
    </div>
  )
}
CompareTable.propTypes = {
  props: PropTypes.any,
}
export default CompareTable
