const {
    deepEqual, ok,
    fail
} = require('assert')

const repository = require('./database')

describe('Suite test for read operation', () => {

    before(async () => {
        await repository.delete()
        await repository.save({
            id: 1,
            name: "Flash",
            skill: "Speed"
        })
    })

    it('should read heroe from file', async () => {
        
        const filterHeroe = 'Flash'
        const EXPECTED = {
            "id": 1,
            "name": "Flash",
            "skill": "Speed"
        }

        const [result] = await repository.find(filterHeroe) //DESTRUCTURING TO GET FIRST POSITION //[first, second] to get more positions
        deepEqual(EXPECTED, result)
    })

    it('should save new heroe into file', async () => {
        
        const newHeroe = {
            "name": "Nodezera",
            "skill": "single thread"
        }

        const saved = await repository.save(newHeroe)
        ok(saved.id)
    })

    it('should delete heroe from id', async () => {
        
        const heroeToDelete = {
            "id": 1,
            "name": "Nodezera",
            "skill": "single thread"
        }

        try {
            const removido = await repository.delete(heroeToDelete.id)
            ok(removido)
        } catch(err) {
            fail(err.message)
        }
    })

    it('should update heroe from id', async () => {
        
        const heroeUpdated = {
            "id": 1,
            "name": "Nodezera Updated",
            "skill": "single thread"
        }

        try {
            const updated = await repository.update(heroeUpdated)
            deepEqual(heroeUpdated, updated)
        } catch(err) {
            fail(err.message)
        }
    })
})