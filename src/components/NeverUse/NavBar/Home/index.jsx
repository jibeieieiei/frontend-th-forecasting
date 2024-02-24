import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './index.css'
// import Search from '../../components/Search'
function Home() {
  // ---- useState ----
  const [symbol, setSymbol] = useState('ADVANC')
  // ---- Start Navigate ----
  const navigate = useNavigate()
  const handleClick = () => {
    // Navigate to the "/compare" route
    navigate('/prediction', { state: { symbol: symbol } })
  }
  const getSymbol = (test) => {
    setSymbol(test)
  }
  return (
    <div>
      <div>This app for Stock Forecasting</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* <Search getSymbol={getSymbol} /> */}
        <p className="boxButton" onClick={handleClick}>
          box
        </p>
      </div>
      <div>Search with symbol Ex.PPTEP</div>
    </div>
  )
}

export default Home
