const {
    deepEqual, ok
} = require('assert')

const repository = require('./database')

describe('Suite test for read operation', () => {
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
})