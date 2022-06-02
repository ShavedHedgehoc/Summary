import { Body, Controller, Post, Get, Param, Query, Delete } from '@nestjs/common';
import { CreateSummaryDto } from "./dto/create-summary.dto";
import { SummaryService } from "./summary.service";
import { GetSummaryDto } from './dto/get-summary.dto';
import { DeleteSummaryDto } from './dto/delete-summary.dto';

@Controller('summary')
export class SummaryController {
    constructor(private summaryService: SummaryService) {
    }

    @Post()
    create(@Body() dto: CreateSummaryDto) {
        return this.summaryService.createSummary(dto);
    }

    @Get()
    getAll() {
        return this.summaryService.getSummary();
    }

    @Get('filter')
    getByDateAndPlant(@Query() query: { date: string, plantId: string }) {
        return this.summaryService.getSummaryByDateAndPlant(query);
    }

    @Get('ids')
    getIds(@Query() query: { date: string, plantId: string }) {
        return this.summaryService.getSummaryIdsByDateAndPlant(query);
    }

    @Get('count')
    // getMonthCounts(@Query() query:{date:string, plantId:string}) {                
    getMonthCounts() {
        return this.summaryService.getSummaryReportCounts();
    }

    @Get('/:id')
    getById(@Param('id') id: string) {
        return this.summaryService.getSummarybyId(id);
    }

    @Delete('count/delete')
    deleteByPlantIdDate(@Body() summaryDto: DeleteSummaryDto) {
        return this.summaryService.deleteSummaryByDatePlant(summaryDto);
    }
}
