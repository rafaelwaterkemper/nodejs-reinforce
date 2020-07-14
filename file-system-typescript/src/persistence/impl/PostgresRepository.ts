import Repository from './../Repository';
import IEntity from './../IEntity'
import { Sequelize } from 'sequelize'

export default class PostgresRepository implements Repository {

    private _sequelize: Sequelize

    constructor(datasource: any) {
        this._sequelize = datasource;
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