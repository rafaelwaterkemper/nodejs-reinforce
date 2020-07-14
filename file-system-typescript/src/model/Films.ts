import { DataTypes, Optional, Model, Sequelize } from "sequelize";

export interface FilmsAttributes {
    id: number;
    heroeId: number;
    name: string;
    date: Date;
}

interface FilmsCreationAttributes extends Optional<FilmsAttributes, "id"> { }

export class Films extends Model<FilmsAttributes, FilmsCreationAttributes>
    implements FilmsAttributes {
    public id!: number;
    public heroeId!: number;
    public name!: string;
    public date!: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const associate = async(sequelize:Sequelize) => {
    Films.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            heroeId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "films",
        }
    )
    Films.sync()
};