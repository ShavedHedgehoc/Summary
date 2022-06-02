import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface CanCreationAttrs {
    name: string;
}

@Table({tableName: 'can', timestamps: false})
export class Can extends Model<Can, CanCreationAttrs> {
    @ApiProperty({example: '1', description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ApiProperty({example: '123', description: 'Can name'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;
}