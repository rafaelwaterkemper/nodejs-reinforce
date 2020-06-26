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
            const fileContent = await this.readHeroesFile()
            const heroes = JSON.parse(fileContent.toString('utf-8'))
    
            heroes[heroes.length - 1].id;
            this.generateSequencial()
            
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
    
    async findAll() {
        const fileContent = await this.readHeroesFile()
        return JSON.parse(fileContent.toString('utf-8'))
    }
    
    async find(name) {
        const fileContent = await this.readHeroesFile()
        const json = JSON.parse(fileContent.toString('utf-8'))
    
        return json.filter(heroe => heroe.name === name)
    }
    
    generateSequencial() {
        return ++this.sequencial
    }
    
    async saveHeroesFile(heroes) {
        await writeFileAsync(this.FILE_PATH, JSON.stringify(heroes))
    }
    
    async readHeroesFile() {
        return await readFileAsync(this.FILE_PATH);
    }
}



module.exports = new Database('./heroes.json')