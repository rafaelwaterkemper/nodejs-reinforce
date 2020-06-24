const {
    get
} = require('axios')

const URL = `https://swapi.dev/api/people`

async function findHeroes(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const response = await get(url)

    return response.data.results.map(mapHeroe);
}

function mapHeroe(heroe) {
    return {
        nome: heroe.name,
        altura: heroe.height
    }
}

module.exports = {
    findHeroes
}