import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { AddRoleDto } from "./dto/add-role.dto";
import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { UserDto } from 'src/token/dto/user-dto';
// import { Error } from 'sequelize';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService,
        private tokenService: TokenService
    ) {
    }

    async registration(dto: CreateUserDto) {
        console.log('reg user');

        const candidate = await this.userRepository.findOne({ where: { email: dto.email } })
        if (candidate) {
            throw new Error('User already exists!')
        }
        const hashPassword = await bcrypt.hash(dto.password, 3)
        const user = await this.userRepository.create({
            name: dto.name, email: dto.email, password: hashPassword
        })
        const role = await this.roleService.getRoleByValue("USER");
        if (!role) {
            throw new Error('Cannot find  role with name USER!')
            console.log('roles err');

        }
        await user.$set('roles', [role.id])
        user.roles = [role]
        const userDto = new UserDto(user)
        const tokens = this.tokenService.generateTokens({ ...userDto })
        await this.tokenService.saveToken(user.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async createUser(dto: CreateUserDto) {
        console.log('create');
        
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER");
        await user.$set('roles', [role.id])
        user.roles = [role]
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
        const users = await this.userRepository.findAll({ include: { all: true } });
        return users;
    }

    async findOrCreate(name: string) {
        const user = await this.userRepository.findOne({ where: { name: name } })
        if (user === null) {
            const data: CreateUserDto = {
                name: name,
                email: 'email',
                password: 'password'
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

    async getUserByEmail(email: string) {

        const user = await this.userRepository.findOne({ 
            where: { email: email }, 
            include: { "all": true } 
        })
        return user
    }
}
