import { Animal } from './Animal'
import IEntity from '../persistence/IEntity';

export enum Raca {
    PITBULL = 'PITBULL',
    PUGGIE = 'PUGGIE',
    POODLE = 'POODLE'
}

export interface ICachorro {
    nome: string,
    raca: Raca,
    weight: number,
    feets: number
}

export class Cachorro extends Animal {
    private _nome: string;
    private _raca: Raca;
    
    constructor(cachorro: ICachorro) {
        super(cachorro.weight, cachorro.feets);
        this._nome = cachorro.nome;
        this._raca = cachorro.raca; 
    }

    get nome(): string{
        return this._nome;
    }

    get raca(): Raca {
        return this._raca;
    }

    toString(): string {
        return `
            nome: ${this.nome}
            raca: ${this.raca}
            peso: ${this.weight},
            patas: ${this.feets}
        `
    }
}

