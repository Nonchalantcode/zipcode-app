import React, { useState } from 'react'
import ErrorPanel from './components/ErrorPanel'
import ZipForm from './components/ZipForm'
import ZipInfoPanel from './components/ZipInfoPanel'
import service from './services/service'
import './styles.css'

const App = () => {
  let [zipCode, setZipCode] = useState('')
  let [zipCodeInfo, setZipCodeInfo] = useState(null)
  let [suggestions, updateSuggestions] = useState([])

  const changeHandler = zipCode => {
    const inputLength = zipCode.length
    setZipCode(zipCode)
    if(inputLength < 3) {
      return updateSuggestions([])
    }
    /* Enforce that user has typed at least the first three digits of a zip code to show some suggestions */
    if(inputLength === 3 || inputLength === 4) {
      return requestSuggestions(zipCode)
    }
    /* When a 5-digit zip code has been entered, check with the server to see if there's info about it */
    if(inputLength === 5) {
      return requestZipcodeInfo(zipCode) 
    }
    
  }

  const requestZipcodeInfo = async (zipCode) => {
    let info = await service.getZipcodeInfo(zipCode)
    info.error ? setZipCodeInfo(info) : setZipCodeInfo(info.data)
    updateSuggestions([])
  }

  const requestSuggestions = async (zipStr) => {
    let response = await service.getZipcodeSuggestions(zipStr)
    updateSuggestions(response.data.suggestions)
  }

  const resetHandler = () => {
    setZipCode('')
    setZipCodeInfo(null)
    updateSuggestions([])
  }

  return (
    <>
      <h1 class="main-heading">Zip code application</h1>
      <div className="app">
        <ZipForm 
          placeholder="Enter a 5-digit zipcode" 
          inputText={zipCode} 
          suggestions={suggestions}
          changeHandler={zipCode => changeHandler(zipCode)}
          submitHandler={requestZipcodeInfo}
          resetHandler={resetHandler} />
        <div className="zip-info">
          {
            zipCodeInfo === null 
              ? zipCodeInfo
              : zipCodeInfo.error ? <ErrorPanel message={zipCodeInfo.message} /> : <ZipInfoPanel zipCode={zipCode} zipCodeInfo={zipCodeInfo} />
          }
        </div>
      </div>
    </>
  )
}

export default App;
