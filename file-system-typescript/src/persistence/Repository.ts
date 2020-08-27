import IEntity from './IEntity';
import { Sequelize } from 'sequelize';

export default interface Repository {
    isConnected(): Promise<boolean>;
    save<T extends IEntity>(entity: T): Promise<IEntity>,
    find(id: Number): IEntity,
    findAll<T extends IEntity>(): Array<T>,
    delete(id: Number): Boolean,
    getDataSource(): Sequelize | any
}