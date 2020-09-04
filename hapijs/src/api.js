const Hapi = require('@hapi/hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongoDbStrategy')
const HeroisSchema = require('./db/strategies/mongodb/schemas/heroSchema')
const HeroeRoute = require('./routes/HeroeRoute')

const app = new Hapi.Server({
  port: 5000
})

function mapperRoutes(instance, methods) {
  return methods.map(method => instance[method]())
}

async function main() {
  const connection = MongoDb.connect()
  const context = new Context(new MongoDb(connection, HeroisSchema))

  app.route([
    ...mapperRoutes(new HeroeRoute(context), HeroeRoute.methods())
  ])

  await app.start()
  console.log('Initialized server')

  return app;
}

module.exports = main();