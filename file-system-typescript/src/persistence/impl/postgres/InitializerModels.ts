import { Sequelize } from 'sequelize'
import { Heroe, Films } from '../../../model/index'

export default class Initializer {
    constructor(sequelize: Sequelize) {
        Films.associate(sequelize);
        Heroe.associate(sequelize);
    }
}