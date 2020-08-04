import BasicRepository from './persistence/BasicRepository'
import PostgresRepository from './persistence/impl/postgres/PostgresRepository'
import { Heroe, EYECOLOR } from './model/Heroe'

const basicRepository = new BasicRepository(new PostgresRepository())

const heroe = Heroe.build({
    name: "Rafael Waterkemper",
    height: 189,
    mass: 95,
    eyeColor: EYECOLOR.BLUE
})

basicRepository.save(heroe)