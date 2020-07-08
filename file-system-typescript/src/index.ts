import BasicRepository from './persistence/BasicRepository'
import MongoRepository from './persistence/impl/MongoRepository'
import { Cachorro } from './model/Cachorro'

const basicRepository = new BasicRepository(new MongoRepository())

const cachorro = <Cachorro>basicRepository.find(1);
console.log(cachorro.toString());