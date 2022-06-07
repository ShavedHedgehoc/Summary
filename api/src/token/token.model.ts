import { ApiProperty } from "@nestjs/swagger";
import { Column, Model, Table, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/users.model";


export interface TokenCreationAttrs {
    userId: number;
    refreshToken: string;
}

@Table({ tableName: 'token', timestamps: false })
export class Token extends Model<Token, TokenCreationAttrs> {
    
    @BelongsTo(() => User)
    user: User;
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;    
    
    @Column({ type: DataType.STRING, allowNull: false })
    refreshToken: string;
}