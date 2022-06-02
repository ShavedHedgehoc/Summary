import {ApiProperty} from "@nestjs/swagger";

export class DeleteApparatusDto {
    @ApiProperty({example: '1', description: 'Apparatus id'})
    readonly id: string;
}