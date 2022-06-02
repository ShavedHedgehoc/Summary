export class GetSummaryDto {
    // @ApiProperty({example: 'John Dow', description: 'User name'})
    readonly date: string;
    readonly plant: string | undefined;

}