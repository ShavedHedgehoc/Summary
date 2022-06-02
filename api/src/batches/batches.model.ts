import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface BatchCreationAttrs {
    name: string;
}

@Table({tableName: 'batch', timestamps: false})
export class Batch extends Model<Batch, BatchCreationAttrs> {
    @ApiProperty({example: '1', description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ApiProperty({example: '123D2', description: 'Batch name'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;
}