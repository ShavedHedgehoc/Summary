import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
    name: string;
    email: string;
    password: string;
}

@Table({tableName: 'user'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ApiProperty({example: 'John Dow', description: 'User name'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})// unique?
    name: string;
    @ApiProperty({example: 'Johnny@gmail.com', description: 'User email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;
    @ApiProperty({example: 'Password', description: 'User password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;
    @BelongsToMany(()=> Role, ()=>UserRoles)
    roles:Role[];
}