import BasicRepository from './persistence/BasicRepository'
import PostgresRepository from './persistence/impl/PostgresRepository'
import { Heroe, associate, EYECOLOR } from './model/Heroe'
import { Model } from 'sequelize'
import IEntity from './persistence/IEntity'

const basicRepository = new BasicRepository(new PostgresRepository())

associate(basicRepository.getDataSource());

const heroe = Heroe.build({
    name: "Rafael Waterkemper",
    height: 189,
    mass: 95,
    eyeColor: EYECOLOR.BLUE
})

basicRepository.save(heroe)