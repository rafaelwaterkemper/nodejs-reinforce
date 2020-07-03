import Repository from "./Repository";

export default class FileRepository<T> implements Repository<T> {
    
    //private properties at proposal to TC39
    #filepath: string;

    constructor(filepath: string) {
        this.#filepath = filepath;
    }

    save(entity: T): void {
        console.log(`Saving entity of type T at file locaized in ${this.#filepath}`)
    };
    find(id: number): T {
        console.log()
        return <T> new Object();
    };
    findAll(): T[] {
        return new Array();
    };
    delete(id: number): Boolean {
        return true;
    };
}