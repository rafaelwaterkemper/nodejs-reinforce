const BaseRoute = require('./BaseRoute')

class HeroeRoute extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/api/heroes',
            method: 'GET',
            handler: (req, header) => {
                const { nome, skip, limit } = req.query

                try {
                    if (NaN(skip))
                        throw Error('Skip should be a number')

                    if (NaN(limit))
                        throw Error('Limit should be a number')

                    let query = {}

                    if (nome)
                        query.nome = nome

                    return this.db.read(query, skip, limit)
                } catch (error) {
                    console.log('Errowww: ', error)
                    return 'Erro interno no servidor'
                }
            }
        }
    }
}

module.exports = HeroeRoute;