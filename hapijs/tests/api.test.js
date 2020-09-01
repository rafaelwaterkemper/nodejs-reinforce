const api = require('../src/api')
const assert = require('assert');
const { get } = require('axios');

const URL = 'http://localhost:5000/api/herois'

const MOCK_HEROI_CADASTRADO = {
    nome: 'Gaviao Negro',
    poder: 'flexas'
};
var app = {}
describe.only('should test api', function () {
    this.beforeAll(async () => {
        app = await api
    })

    this.afterAll(async () => {
        let goOut = await app.stop({ timeout: 1000 })
        console.log('hapi server stopped')
        process.exit((goOut) ? 1 : 0)
    })

    it('should return a heroe', async () => {
        const response = await get(URL)
        let { nome, poder } = response.data[0];
        assert.deepEqual(MOCK_HEROI_CADASTRADO, { nome, poder })
    })
})