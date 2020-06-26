const FILE_PATH = './heroes.json'
const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

const [readFileAsync, writeFileAsync] = [
    promisify(readFile),
    promisify(writeFile)
]

var sequencialAtual = 0

async function save(heroe) {
    try {
        const fileContent = await readHeroesFile()
        const heroes = JSON.parse(fileContent.toString('utf-8'))

        sequencialAtual = heroes[heroes.length -1].id;

        heroe = generateSequencial(heroe)
        heroes.push(heroe)
        await saveHeroesFile(heroes)
        
        return heroe
    } catch (err) {
        console.log('Error to save new heroe', err)
    }
}

function generateSequencial(heroe) {
    heroe.id = ++sequencialAtual
    return heroe
}

async function saveHeroesFile(heroes) {
    await writeFileAsync(FILE_PATH, JSON.stringify(heroes))
}

async function readHeroesFile() {
    return await readFileAsync(FILE_PATH);
}

async function findAll() {
    const fileContent = await readHeroesFile()
    return JSON.parse(fileContent.toString('utf-8'))
}

async function find(name) {
    const fileContent = await readHeroesFile()
    const json = JSON.parse(fileContent.toString('utf-8'))

    return json.filter(heroe => heroe.name === name)
}

module.exports = {
    save,
    find,
    findAll
}