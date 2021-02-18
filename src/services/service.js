import axios from 'axios'

const baseURL = 'https://i4rka3j55j.execute-api.us-east-2.amazonaws.com/prod/zipcodes'

const getZipcodeInfo = (zipCode) => {
    return axios
            .post(`${baseURL}`, {"zip": zipCode})
            .then(response => {
                return response
            })
            .catch(err => ({...err.response.data, error: true}))
}

const getZipcodeSuggestions = (zipCode) => {
    return axios
            .post(`${baseURL}/suggestions`, {"zip": zipCode})
            .then(response => {
                return response
            })
            .catch(err => ({...err.response.data, error: true}))
}

export default { getZipcodeInfo, getZipcodeSuggestions }