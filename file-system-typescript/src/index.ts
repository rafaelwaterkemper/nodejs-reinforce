import BasicRepository from './persistence/BasicRepository'
import PostgresRepository from './persistence/impl/postgres/PostgresRepository'
import { Heroe, EYECOLOR } from './model/Heroe'

async function exec() {
    const postgresRepository = new PostgresRepository();
    await postgresRepository.init();
    const basicRepository = new BasicRepository(postgresRepository);

    const heroe = Heroe.build({
        name: "Rafael Marangoni",
        height: 189,
        mass: 95,
        eyeColor: EYECOLOR.BLUE
    })

    await basicRepository.save(heroe)
    console.log('Hellow')
}

exec();