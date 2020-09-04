const BaseRoute = require('./BaseRoute')
const Joi = require('@hapi/joi')
const Boom = require('boom')
const { error } = require('console')

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

    delete() {
        return {
            path: '/api/heroes/{id}',
            method: 'DELETE',
            handler: async (req, headers) => {
                const { id } = req.params

                try {
                    const operation = await this.db.delete(id)
                    console.log(`Operacao delete ${JSON.stringify(operation)}`)
                    if(operation.ok !== 1) return Boom.notFound('Id não localizado')
                    return 'Removido';
                } catch(err) {
                    console.log('error ', err)
                    return Boom.internal();
                }
            }
        }
    }

    update() {
        return {
            path: '/api/heroes/{id}',
            method: 'PATCH',
            handler: async (req, headers) => {
                const { id } = req.params
                const { payload } = req
                
                const dadosString = JSON.stringify(payload)
                const dados = JSON.parse(dadosString)

                try {
                    const operation = await this.db.update(id, dados)
                    if(operation.nModified !== 1) return Boom.notFound('Id não localizado')
                    return 'Alterado';
                } catch(err) {
                    console.log('error ', err)
                    return Boom.internal();
                }
            }
        }
    }
}

module.exports = HeroeRoute;