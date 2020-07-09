import Repository from './Repository';
import IEntity from './IEntity'

export default class BasicRepository implements Repository {

    //private properties at proposal to TC39
    #repository: Repository;

    constructor(repository: Repository) {
        this.#repository = repository;
    }

    save<T extends IEntity>(entity: T): void {
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