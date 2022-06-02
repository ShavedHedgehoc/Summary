import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'John Dow', description: 'User name'})
    readonly name: string;
    @ApiProperty({example: 'johnny@mail.com', description: 'User email'})
    readonly email: string;
    @ApiProperty({example: 'qwerty', description: 'User password'})
    readonly password: string
}