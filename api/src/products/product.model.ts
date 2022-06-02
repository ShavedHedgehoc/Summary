import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface ProductCreationAttrs {
    name: string;
}

@Table({tableName: 'product', timestamps: false})
export class Product extends Model<Product, ProductCreationAttrs> {
    @ApiProperty({example: '1', description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ApiProperty({example: '123', description: 'Product name'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;
}