import Repository from './../Repository';
import IEntity from './../IEntity'

export default class MongoRepository implements Repository {

    constructor() {
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

    isConnected(): Promise<boolean> {
        return Promise.resolve(true);
    }
}