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
                return this.db.read()
            }
        }
    }
}

module.exports = HeroeRoute;