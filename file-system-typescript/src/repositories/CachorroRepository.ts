import { Cachorro } from "../model/Cachorro";
import FileRepository from "../persistence/FileRepository";

export default class CachorroRepository extends FileRepository<Cachorro> {
    constructor(filepath: string) {
        super(filepath);
    }
}