import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {DeleteUserDto} from "./dto/delete.user.dto";

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {
    }

    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    

    @Delete()
    deleteById(@Body() userDto: DeleteUserDto) {
        return this.userService.deleteUser(userDto);
    }
}
