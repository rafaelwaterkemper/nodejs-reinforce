const api = require('../src/api')
const assert = require('assert');
const { get } = require('axios');

const URL = 'http://localhost:5000/api/heroes'

const MOCK_HEROI_CADASTRADO = {
    nome: 'Gaviao Negro',
    poder: 'flexas'
};

const MOCK_CADASTRAR_HEROI = {
    nome: `Heroe at time ${new Date().toLocaleString()}`,
    poder: 'change de time'
}

MOCK_ID = ''

var app = {}
describe('should test api', function () {
    this.beforeAll(async () => {
        app = await api
        const preCreate = await app.inject({
            url: '/api/heroes',
            method: 'POST',
            payload: MOCK_CADASTRAR_HEROI
        })
        const { _id } = JSON.parse(preCreate.payload)
        MOCK_ID = _id 
    })

    this.afterAll(async () => {
        let goOut = await app.stop()
        setTimeout(()=> process.exit((goOut) ? 1 : 0), 2000)
    })

    it('should return a heroe', async () => {
        const response = await get(URL)
        let { nome, poder } = response.data[0];
        
        assert.deepEqual(MOCK_HEROI_CADASTRADO, { nome, poder })
    })

    it('using hapi injet', async () => {
        const response = await app.inject({
            url: '/api/heroes',
            method: 'GET'
        })

        const data = JSON.parse(response.payload)

        assert.equal(response.statusCode, 200)
        assert.ok(Array.isArray(data))
    })

    it('save heroe', async() => {
        const response = await app.inject({
            url: '/api/heroes',
            method: 'POST',
            payload: MOCK_CADASTRAR_HEROI
        })

        const heroe = JSON.parse(response.payload)
        assert.ok(heroe._id)
        assert.ok(response.statusCode, 202)
    })

    it('PATCH should update a heroe', async() => {
        const CHANGES = {
            nome: 'Gavião alterado'
        }

        const response = await app.inject({
            url: `/api/heroes/${MOCK_ID}`,
            method: 'PATCH',
            payload: CHANGES
        })

        assert.ok(response.statusCode, 200)
    })

    it('DELETE should delete a heroe', async () => {
        const response = await app.inject({
            url: `/api/heroes/${MOCK_ID}`,
            method: 'DELETE'
        })

        assert.deepStrictEqual(response.statusCode, 200)
    })

})