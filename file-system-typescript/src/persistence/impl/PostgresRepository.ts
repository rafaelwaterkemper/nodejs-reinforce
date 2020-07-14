import Repository from './../Repository';
import IEntity from './../IEntity'
import { Sequelize } from 'sequelize'
import { Cachorro, Raca } from './../../model/Cachorro'

export default class PostgresRepository implements Repository {

    private _sequelize: Sequelize

    constructor() {
        this._sequelize = this.connect();
    }

    connect(): Sequelize {
        return new Sequelize('postgres://waterkemper:waterkemper@localhost:5432/heroes')
    }

    async isConnected(): Promise<boolean> {
        try {
            await this._sequelize.authenticate();
            return true;
        } catch (error) {
            console.error('fail!', error);
            return false;
        }
    }

    save<T extends IEntity>(entity: T): void {
        console.log('Save by mongo repository')
    };
    find(id: Number): IEntity {
        return new Cachorro({ "nome": 'Tiao', "raca": Raca.POODLE, "weight": 10, "feets": 10 })
    };
    findAll<T extends IEntity>(): T[] {
        return []
    };
    delete(id: number): Boolean {
        return true;
    };
}