export default interface Repository<T> {
    save(entity: T): void,
    find(id: Number): T,
    findAll(): Array<T>,
    delete(id: Number): Boolean
}