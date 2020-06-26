const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

const [readFileAsync, writeFileAsync] = [
    promisify(readFile),
    promisify(writeFile)
]

class Database {
    constructor(filePath) {
        this.FILE_PATH = filePath
        this.sequencial = 0;
    }
    
    async save(heroe) {
        try {
            const heroes = await this.readHeroesFile()
    
            this.sequencial = heroes[heroes.length - 1].id + 1
            
            let heroeComId = {
                ...heroe,
                id: this.sequencial
            }

            const updatedFile = [
                ...heroes,
                heroeComId
            ]

            await this.saveHeroesFile(updatedFile)
    
            return heroeComId
        } catch (err) {
            console.log('Error to save new heroe', err)
        }
    }

    async delete() {
        //implement
    }

    async update() {
        //implement
    }
    
    async findAll() {
        return await this.readHeroesFile()
    }
    
    async find(name) {
        const heroes = await this.readHeroesFile()
    
        return heroes.filter(heroe => heroe.name === name)
    }
    
    async saveHeroesFile(heroes) {
        await writeFileAsync(this.FILE_PATH, JSON.stringify(heroes))
    }
    
    async readHeroesFile() {
        const fileContent = await readFileAsync(this.FILE_PATH);
        return JSON.parse(fileContent.toString('utf-8'))
    }
}



module.exports = new Database('./heroes.json')