import Repository from '../../Repository';
import IEntity from '../../IEntity'
import { Sequelize, Model } from 'sequelize'
import InitializerModels from './InitializerModels'

export default class PostgresRepository implements Repository {

    private _sequelize: Sequelize
    private _initializer: InitializerModels;

    constructor() {
        this._sequelize = new Sequelize('postgres://waterkemper:waterkemper@localhost:5432/heroes');
        this._initializer = new InitializerModels(this._sequelize);
        
    }

    async init() {
        await this._initializer.init();
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

    async save<T extends IEntity>(entity: T): Promise<T> {
        let model = await this._sequelize.models[''].create(entity)
        return Promise.resolve(entity);
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