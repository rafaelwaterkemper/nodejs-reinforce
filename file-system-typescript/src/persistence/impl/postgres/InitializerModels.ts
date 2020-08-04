import { Sequelize } from 'sequelize'
import { Heroe, Films } from '../../../model/index'

export default class Initializer {
    constructor(sequelize: Sequelize) {
        Heroe.associate(sequelize);
        Films.associate(sequelize);
    }
}