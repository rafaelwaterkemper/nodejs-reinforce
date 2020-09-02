const api = require('../src/api')
const assert = require('assert');
const { get } = require('axios');

const URL = 'http://localhost:5000/api/heroes'

const MOCK_HEROI_CADASTRADO = {
    nome: 'Gaviao Negro',
    poder: 'flexas'
};
var app = {}
describe('should test api', function () {
    this.beforeAll(async () => {
        app = await api
    })

    this.afterAll(async () => {
        let goOut = await app.stop()
        console.log('hapi server stopped')
        setTimeout(()=> process.exit((goOut) ? 1 : 0), 2000)
    })

    it('should return a heroe', async () => {
        const response = await get(URL)
        console.log('TESTANDO')
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

    
})