import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Plant} from "../plants/plants.model";
import {LabStatus} from "../labstatuses/labstatuses.model";
import {Summary} from "../summary/summary.model";
import {User} from "../users/users.model";

 export interface LabRecordCreationAttrs {
    summaryId: number;
    labStatusId: number;
    userId: number;
    timeStamp: Date;
}

@Table({tableName: 'lab_record', timestamps: false})
export class LabRecord extends Model<LabRecord, LabRecordCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @BelongsTo(() => Summary)
    summary: Summary;
    @ForeignKey(() => Summary)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    summaryId: number;

    @BelongsTo(() => User)
    user: User;
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @BelongsTo(() => LabStatus)
    labStatus: LabStatus;
    @ForeignKey(() => LabStatus)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    labStatusId: number;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    timeStamp: Date;
}