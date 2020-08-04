import {
    Sequelize,
    Model,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    Optional
} from 'sequelize'

import { Films, associate as FilmsAssociate} from './Films'

export enum EYECOLOR {
    GREEN = "GREEN",
    BLUE = "BLUE"
}

interface HeroeAttributes {
    id: number;
    name: string;
    height: number;
    mass: number | null;
    eyeColor: EYECOLOR;
}

interface HeroeCreationAttributes extends Optional<HeroeAttributes, "id"> { }

export class Heroe extends Model<HeroeAttributes, HeroeCreationAttributes>
    implements HeroeAttributes {

    public id!: number;
    public name!: string;
    public height!: number;
    public mass!: number | null;
    public eyeColor!: EYECOLOR;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
    public getFilms!: HasManyGetAssociationsMixin<Films>; // Note the null assertions!
    public addFilms!: HasManyAddAssociationMixin<Films, number>;
    public hasFilms!: HasManyHasAssociationMixin<Films, number>;
    public countFilms!: HasManyCountAssociationsMixin;
    public createFilms!: HasManyCreateAssociationMixin<Films>;

    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    public readonly films?: Films[]; // Note this is optional since it's only populated when explicitly requested in code

    public static associations: {
        films: Association<Heroe, Films>;
    };

    public static async associate(sequelize: Sequelize) {
    
        await Heroe.init(
            {
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: new DataTypes.STRING(128),
                    allowNull: false,
                },
                height: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                mass: {
                    type: DataTypes.INTEGER,
                    allowNull: true
                },
                eyeColor: {
                    type: DataTypes.ENUM("GREEN", "BLUE"),
                    allowNull: true
                }
            },
            {
                tableName: "heroes",
                sequelize, // passing the `sequelize` instance is required
            }
        );
    
        // Here we associate which actually populates out pre-declared `association` static and other methods.
        await FilmsAssociate(sequelize);
        await Heroe.hasMany(Films, {
            sourceKey: "id",
            foreignKey: "heroeId",
            as: "films", // this determines the name in `associations`!
        });
    
        await Heroe.sync();
    }
}