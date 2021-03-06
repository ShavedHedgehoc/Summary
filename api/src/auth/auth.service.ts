import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
        private jwtService: JwtService) { }

    async login(userDto: CreateUserDto) {}


    async registration(dto: CreateUserDto) {
        console.log('reg');
        console.log(dto);
        
        const candidate = await this.userService.getUserByEmail("weqweqw");
        if (candidate) {
            throw new HttpException('Пользователь существует', HttpStatus.BAD_REQUEST)
        }
        // const hashPassword = bcrypt.hash(dto.password, 5);
        // const user = await this.userService.createUser({ ...dto, password: hashPassword })
        // return this.generateToken(user);

    }

    async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles }
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
