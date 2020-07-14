import BasicRepository from './persistence/BasicRepository'
import PostgresRepository from './persistence/impl/PostgresRepository'
import { HeroeFactory } from './model/Heroe'
import { Sequelize } from 'sequelize'



const sequelize = new Sequelize('postgres://waterkemper:waterkemper@localhost:5432/heroes')


const basicRepository = new BasicRepository(new PostgresRepository(sequelize))
const Heroe = HeroeFactory(sequelize);
