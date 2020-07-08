import Repository from './../Repository';
import IEntity from './../IEntity'
import { Cachorro, Raca } from './../../model/Cachorro'

export default class PostgresRepository implements Repository {

    constructor() {
    }

    save<T extends IEntity>(entity: T): void {
        console.log('Save by mongo repository')
    };
    find(id: Number): IEntity {
        return new Cachorro({ "nome": 'Bob', "raca": Raca.POODLE, "weight": 10, "feets": 10 })
    };
    findAll<T extends IEntity>(): T[] {
        return []
    };
    delete(id: number): Boolean {
        return true;
    };
}