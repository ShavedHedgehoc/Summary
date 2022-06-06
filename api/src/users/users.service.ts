import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {DeleteUserDto} from "./dto/delete-user.dto";
import { AddRoleDto } from "./dto/add-role.dto";
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService) {
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER");
        await user.$set('roles', [role.id])
        user.roles=[role]
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users;
    }

    async findOrCreate(name: string) {
        const user = await this.userRepository.findOne({where: {name: name}})
        if (user === null) {
            const data:CreateUserDto={
                name:name,
                email:'email',
                password:'password'
            }
            const newUser = await this.userRepository.create(data);
            return newUser;

        } else {
            return user
        }
    }

    async deleteUser(dto: DeleteUserDto) {
        const userToDelete = await this.userRepository.destroy({
            where: {
                id: Number(dto.id)
            }
        }).then(
            function (rowDeleted) {
                if (rowDeleted === 1) {
                    return dto.id
                }
            }, function (err) {
                return err
            }
        )
    }
}
