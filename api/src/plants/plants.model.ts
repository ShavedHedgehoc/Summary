import { ApiProperty } from "@nestjs/swagger";
import { Column, Model, Table, DataType } from "sequelize-typescript";


interface PlantCreationAttrs {
    name: string;
}

@Table({ tableName: 'plant', timestamps: false })
export class Plant extends Model<Plant, PlantCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Unique id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    @ApiProperty({ example: 'Пискаревка', description: 'Plant name' })
    @Column({ type: DataType.STRING,  unique: true, allowNull: false })
    name: string;
}
