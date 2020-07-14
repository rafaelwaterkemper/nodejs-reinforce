import BasicRepository from './persistence/BasicRepository'
import PostgresRepository from './persistence/impl/PostgresRepository'
import { Heroe, associate, EYECOLOR } from './model/Heroe'
import { Sequelize } from 'sequelize'
const sequelize = new Sequelize('postgres://waterkemper:waterkemper@localhost:5432/heroes')


const basicRepository = new BasicRepository(new PostgresRepository(sequelize))

associate(sequelize);

Heroe.create({
    name: "Rafael Waterkemper",
    height: 189,
    mass: 95,
    eyeColor: EYECOLOR.BLUE
})
