import IEntity from './IEntity';

export default interface Repository {
    isConnected(): Promise<boolean>;
    save<T extends IEntity>(entity: T): void,
    find(id: Number): IEntity,
    findAll<T extends IEntity>(): Array<T>,
    delete(id: Number): Boolean
}