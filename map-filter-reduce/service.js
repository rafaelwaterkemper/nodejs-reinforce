const axios = require('axios')
const URL = `https://swapi.dev/api/people`

module.exports = async function findHeroes(nome) {
    const url = `${URL}?search=${nome}&format=json`
    const response = await axios.get(url)
    return response.data
}