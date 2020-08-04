import Repository from './Repository';
import IEntity from './IEntity'
import { Model } from 'sequelize/types';
import PostgresRepository from './impl/postgres/PostgresRepository';

export default class BasicRepository {

    //private properties at proposal to TC39
    #repository: PostgresRepository;

    constructor(repository: PostgresRepository | any) {
        this.#repository = repository;
    }

    getDataSource(): any {
        return this.#repository.getDataSource();    
    }

    save<T extends Model>(entity: T): void {
        this.#repository.save(entity);
    };
    find(id: Number): IEntity {
        return this.#repository.find(id)
    };
    findAll<T extends IEntity>(): T[] {
        return this.#repository.findAll();
    };
    delete(id: number): Boolean {
        return this.#repository.delete(id);
    };

    isConnected(): Promise<boolean> {
        return this.#repository.isConnected();
    }
}