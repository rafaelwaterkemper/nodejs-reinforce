import { Sequelize } from 'sequelize'
import { Heroe, Films } from '../../../model/index'

export default class Initializer {

    private _sequelize: Sequelize;
    
    constructor(sequelize: Sequelize) {
        this._sequelize = sequelize;
    }

    public async init(): Promise<void> {
        await Films.associate(this._sequelize);
        await Heroe.associate(this._sequelize);
    }
}