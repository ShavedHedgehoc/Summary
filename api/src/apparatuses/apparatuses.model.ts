import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface ApparatusCreationAttrs {
    name: string;
}

@Table({tableName: 'apparatus', timestamps: false})
export class Apparatus extends Model<Apparatus, ApparatusCreationAttrs> {
    @ApiProperty({example: '1', description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ApiProperty({example: '51', description: 'Apparatus name'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;
}