const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongoDbStrategy')
const HeroisSchema = require('./db/strategies/mongodb/schemas/heroSchema')

const app = new Hapi.Server({
  port: 5000
})

async function main() {
  const connection = MongoDb.connect()
  const context = new Context(new MongoDb(connection, HeroisSchema))

  app.route([
    {
      path: '/api/herois',
      method: 'GET',
      handler: (req, header) => {
        return context.read()
      }
    },
    {
      path: '/api/herois',
      method: 'POST',
      handler: (req, header) => {
        context.create(req.payload);
      }
    }
  ])

  app.start()
}

main();