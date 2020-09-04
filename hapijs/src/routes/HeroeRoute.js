const BaseRoute = require('./BaseRoute')
const Joi = require('@hapi/joi')

class HeroeRoute extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/api/heroes',
            method: 'GET',
            options: {
                validate: {
                    failAction: (req, header, err) => {
                        throw err
                    },
                    //payload
                    //headers 
                    //params -> DA url :ID
                    query: Joi.object({
                        skip: Joi.number().integer().min(1).max(100).default(10).error(() => new Error('Campo skip deve ser numérico')),
                        limit: Joi.number().integer().default(20),
                        nome: Joi.string().min(3).max(100)
                    }).options({ stripUnknown: true })
                }
            },
            handler: (req, header) => {
                const { nome, skip, limit } = req.query

                try {
                    let query = {}

                    if (nome)
                        query = {
                            nome: {
                                $regex: `.*${nome}*.`
                            }
                        }

                    return this.db.read(query, skip, limit)
                } catch (error) {
                    console.log('Errowww: ', error)
                    return 'Erro interno no servidor'
                }
            }
        }
    }

    post() {
        return {
            path: '/api/heroes',
            method: 'POST',
            options: {
                validate: {
                    failAction: (req, header, err) => {
                        console.log(`Error ${err}`)
                    },
                    payload: Joi.object({
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(3).max(20)
                    })
                }
            },
            handler: async (req, headers) => {
                try {
                    console.log(req.payload)
                    const { nome, poder } = req.payload
                    return await this.db.create({ nome, poder })
                } catch (err) {
                    console.log('Erro', err)
                    return 'Error to save a new hero'
                }
            }
        }
    }
}

module.exports = HeroeRoute;