import React, { useState } from 'react'
import ErrorPanel from './components/ErrorPanel'
import ZipInfoPanel from './components/ZipInfoPanel'
import service from './services/service'

const App = () => {
  let [zipCode, setZipCode] = useState('')
  let [zipCodeInfo, setZipCodeInfo] = useState(null)

  const changeHandler = ({ target: { value }}) => {
    setZipCode(value)
  }

  const submitHandler = async (ev) => {
    ev.preventDefault()
    let info = await service.getZipcodeInfo(zipCode)
    info.error ? setZipCodeInfo(info) : setZipCodeInfo(info.data)
  }

  const resetHandler = () => setZipCode('')

  return (
    <>
      <h1>Zip code application</h1>
      <form onSubmit={submitHandler} onReset={resetHandler}>
        <input type="text" value={ zipCode } onChange={changeHandler} />
        <button type="submit">Search</button>
        <button type="reset">Reset</button>
      </form>
      <div className="zip-info">
        {
          zipCodeInfo === null 
            ? zipCodeInfo
            : zipCodeInfo.error ? <ErrorPanel message={zipCodeInfo.message} /> : <ZipInfoPanel zipCode={zipCode} zipCodeInfo={zipCodeInfo} />
        }
      </div>
    </>
  )
}

export default App;
