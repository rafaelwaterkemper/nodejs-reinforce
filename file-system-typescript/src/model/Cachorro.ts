import { Animal } from './Animal'

export enum Raca {
    PITBULL,
    PUGGIE,
    POODLE
}

export interface ICachorro {
    nome: string,
    raca: Raca,
    weight: number,
    feets: number
}

export class Cachorro extends Animal {
    private nome: string;
    private raca: Raca;
    
    constructor(cachorro: ICachorro) {
        super(cachorro.weight, cachorro.feets);
        this.nome = cachorro.nome;
        this.raca = cachorro.raca; 
    }

    latir() {
        console.log(`Latido do tipo ${this.raca}`)
    }
}

