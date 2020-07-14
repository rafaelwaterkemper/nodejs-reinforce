import { Sequelize } from 'sequelize'
import IEntity from '../persistence/IEntity'

export class Animal implements IEntity {
    
    public weight: number;
    public feets: number;
    
    constructor(weight: number, feets: number) {
        this.weight = weight;
        this.feets = feets;
    }

    getId(): number {   
        return 1;
    }

}

