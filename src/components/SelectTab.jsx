import { useNavigate } from 'react-router-dom'
import '../style/selectTab.css'
function SelectTab() {
  const navigate = useNavigate()
  const url = window.location.pathname
  return (
    <div className="navbar">
      <div className="thai-stock">Thai Stock Forecasting</div>
      <div className="tab-menu">
        <div className="select-tab">
          <button
            onClick={() => {
              navigate('/')
            }}
            className={url === '/' ? 'tab-active' : 'tab'}
          >
            Forecasting
          </button>
          <button
            onClick={() => {
              navigate('/information')
            }}
            className={url !== '/' ? 'tab-active' : 'tab'}
          >
            Information
          </button>
        </div>
      </div>
    </div>
  )
}

export default SelectTab
