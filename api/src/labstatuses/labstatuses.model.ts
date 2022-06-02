import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface LabStatusCreationAttrs {
    name: string;
}

@Table({tableName: 'lab_status', timestamps: false})
export class LabStatus extends Model<LabStatus, LabStatusCreationAttrs> {
    @ApiProperty({example: '1', description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ApiProperty({example: '123', description: 'Lab status name'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;
}