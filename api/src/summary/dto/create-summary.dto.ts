import {ApiProperty} from "@nestjs/swagger";

export class CreateSummaryDto {
    // @ApiProperty({example: 'John Dow', description: 'User name'})
    readonly date: string;
    readonly plant: string;
    readonly batch: string;
    readonly product: string;
    readonly conveyor: string;
    readonly apparatus: string;
    readonly can: string;
    readonly plan: number;
    readonly prodMonth: string;
    readonly expired: string;
    readonly comments: string;
}