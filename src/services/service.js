import axios from 'axios'

const baseURL = '/zipcodes'

const getZipcodeInfo = (zipCode) => {
    return axios
            .get(`${baseURL}/${zipCode}`)
            .then(response => response)
            .catch(err => ({...err.response.data, error: true}))
}

export default { getZipcodeInfo }