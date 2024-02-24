import axios from 'axios'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
function Background({ symbol = 'ADVANC' }) {
  // ---- useState ----
  const [fullname, setFullname] = useState('')
  const [business, setBusiness] = useState('')
  // API Call
  const API = `http://127.0.0.1:8000/specific_info_${symbol}`
  const GetBackground = () => {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(API)
          const data = response.data
          setFullname(data[0][symbol])
          setBusiness(data[1][symbol])
        } catch (error) {
          console.log('Error fetching Data:', error)
        }
      }
      fetchData()
    }, [])
  }
  GetBackground()
  return (
    <div>
      <div>{fullname}</div>
      {business}
    </div>
  )
}
Background.propTypes = {
  symbol: PropTypes.string,
}
export default Background
