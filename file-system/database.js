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
    
            this.sequencial = heroes[0] ? heroes[heroes.length - 1].id + 1 : 1
            
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

    async delete(id) {
        const heroes = await this.readHeroesFile()

        if(!id) {
            await this.saveHeroesFile([])
            return true
        }

        const position = heroes.findIndex(heroe => heroe.id === id)
        
        if(position === -1) {
            throw new Error('Heroe not found')
        }

        await this.saveHeroesFile(heroes.splice(position, 1))
        return true
    }

    async update(update) {
        const heroes = await this.readHeroesFile()
        const position = heroes.findIndex(heroe => heroe.id === update.id)
        
        if(position === -1) {
            throw new Error('Heroe not found')
        }

        heroes[position] = {
            ...heroes[position],
            name: update.name,
            skill: update.skill

        }

        await this.saveHeroesFile(heroes)
        return heroes[position]
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