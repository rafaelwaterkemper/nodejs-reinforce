import Repository from './../Repository';
import IEntity from './../IEntity'
import { Sequelize, Model } from 'sequelize'

export default class PostgresRepository {

    private _sequelize: Sequelize

    constructor() {
        this._sequelize = new Sequelize('postgres://waterkemper:waterkemper@localhost:5432/heroes');
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

    getDataSource(): Sequelize {
        return this._sequelize;
    }

    async save<T extends Model>(entity: T): Promise<T> {
        return await entity.save();
    };
    find(id: Number): IEntity | any {
        return {}
    };
    findAll<T extends IEntity>(): T[] {
        return []
    };
    delete(id: number): Boolean {
        return true;
    };
}