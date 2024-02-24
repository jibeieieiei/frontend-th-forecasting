import React, { useState } from 'react'
import PricePredict from '../../components/Prediction/PricePredict'
import { number } from 'prop-types'
import Prediction from '../Prediction/Prediction'

function Compare() {
  // ---- useState ----
  const [numberCompare, setNumberCompare] = useState(0)
  const [isShow, setIsShow] = useState(false)
  // ---- Function ----
  const handleChange = (event) => {
    // event.preventDefault()
    const { value } = event.target
    console.log('value', typeof value)
    setNumberCompare(value)
    setIsShow(true)
  }
  const newArr = [...Array(Number(numberCompare)).keys()]
  console.log('newArr', newArr)
  // console.log(numberCompare)
  return (
    <div>
      Compare
      {/* <form> */}
      <select name="number-compare" id="select-compare" onChange={handleChange}>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      {/* </form> */}
      {/* {isShow &&
        newArr.map((item, x) => (
          // <div key={x} style={{ display: 'flex', alignItems: 'strech' }}>
          //   <PricePredict />
          // </div>
          <div key={x} style={{ display: 'flex', alignItems: 'strech' }}>
            <PricePredict />
          </div>
        ))} */}
      <div style={{ display: 'flex', alignItems: 'strech' }}>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
      </div>
    </div>
  )
}

export default Compare
