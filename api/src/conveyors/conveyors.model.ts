import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface ConveyorCreationAttrs {
    name: string;
}

@Table({tableName: 'conveyor', timestamps: false})
export class Conveyor extends Model<Conveyor, ConveyorCreationAttrs> {
    @ApiProperty({example: '1', description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ApiProperty({example: '123', description: 'Conveyor name'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;
}