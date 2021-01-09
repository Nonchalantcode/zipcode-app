import React, { useState } from 'react'
import ErrorPanel from './components/ErrorPanel'
import ZipForm from './components/ZipForm'
import ZipInfoPanel from './components/ZipInfoPanel'
import service from './services/service'

const noop = () => {}

const App = () => {
  let [zipCode, setZipCode] = useState('')
  let [zipCodeInfo, setZipCodeInfo] = useState(null)

  const changeHandler = zipCode => {
    setZipCode(zipCode)
    zipCode.length === 5 
      ? requestZipcodeInfo(zipCode) 
      : noop()
  }

  const requestZipcodeInfo = async (zipCode) => {
    let info = await service.getZipcodeInfo(zipCode)
    info.error ? setZipCodeInfo(info) : setZipCodeInfo(info.data)
  }

  const resetHandler = () => {
    setZipCode('')
    setZipCodeInfo(null)
  }

  return (
    <>
      <h1>Zip code application</h1>
      <ZipForm 
        placeholder="Enter a 5-digit zipcode" 
        inputText={zipCode} 
        onChange={zipCode => changeHandler(zipCode)}
        onSubmit={requestZipcodeInfo}
        resetHandler={resetHandler} />
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
