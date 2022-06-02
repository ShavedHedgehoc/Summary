import {Column, Model, Table, DataType, BelongsTo, ForeignKey, HasMany} from "sequelize-typescript";
import { Plant } from '../plants/plants.model';
import { Batch } from '../batches/batches.model';
import { Product } from '../products/product.model';
import { Conveyor } from '../conveyors/conveyors.model';
import { Apparatus } from '../apparatuses/apparatuses.model';
import { Can } from '../cans/cans.model';
import {LabRecord} from "../labrecords/labrecords.model";

export interface SummaryCreationAttrs {
    // date: string;
    date: Date;
    plantId: number;
    batchId: number;
    productId: number;
    conveyorId: number;
    apparatusId: number;
    canId: number;
    plan: number;
    prodMonth: string;    
    expired: string;    
    comments: string;
}

@Table({ tableName: 'summary' })
export class Summary extends Model<Summary, SummaryCreationAttrs> {
    
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    
    // @Column({ type: DataType.STRING, allowNull: false })
    // date: string;

    @Column({ type: DataType.DATEONLY, allowNull: false })
    date: Date;

    @BelongsTo(() => Plant)
    plant: Plant;
    @ForeignKey(() => Plant)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    plantId: number;

    @BelongsTo(() => Batch)
    batch: Batch;
    @ForeignKey(() => Batch)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    batchId: number;

    @BelongsTo(() => Product)
    product: Product;
    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    productId: number;

    @BelongsTo(() => Conveyor)
    conveyor: Conveyor;
    @ForeignKey(() => Conveyor)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    conveyorId: number;

    @BelongsTo(() => Apparatus)
    apparatus: Apparatus;
    @ForeignKey(() => Apparatus)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    apparatusId: number;

    @BelongsTo(() => Can)
    can: Can;
    @ForeignKey(() => Can)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    canId: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    plan: number;

    @Column({ type: DataType.STRING, allowNull: false })
    prodMonth: string;

    @Column({ type: DataType.STRING, allowNull: false })
    expired: string;

    @Column({ type: DataType.STRING })
    comments: string;

    @HasMany(() => LabRecord)
    labRecords: LabRecord[];


}
