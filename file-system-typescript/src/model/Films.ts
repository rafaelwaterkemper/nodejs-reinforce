import { DataTypes, Optional, Model } from "sequelize/types";

interface FilmsAttributes {
    id: number;
    heroe: number;
    name: string;
    date: Date;
}

interface FilmsCreationAttributes extends Optional<FilmsAttributes, "id"> { }

export class Films extends Model<FilmsAttributes, FilmsCreationAttributes>
    implements FilmsAttributes {
    public id!: number;
    public heroe!: number;
    public name!: string;
    public date!: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

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
        heroe: {
            type: DataTypes.INTEGER,
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
);