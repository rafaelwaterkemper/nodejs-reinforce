import BasicRepository from './persistence/BasicRepository'
import PostgresRepository from './persistence/impl/PostgresRepository'
import { Cachorro } from './model/Cachorro'

const basicRepository = new BasicRepository(new PostgresRepository())

const cachorro = <Cachorro>basicRepository.find(1);
console.log(cachorro.toString());