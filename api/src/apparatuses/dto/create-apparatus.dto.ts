import {ApiProperty} from "@nestjs/swagger";

export class CreateApparatusDto {
    @ApiProperty({example: '51', description: 'Apparatus name'})
    readonly name:string;
}