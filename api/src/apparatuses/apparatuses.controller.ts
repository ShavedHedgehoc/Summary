import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ApparatusesService} from "./apparatuses.service";
import {Apparatus} from "./apparatuses.model";
import {CreateApparatusDto} from "./dto/create-apparatus.dto";
import {DeleteApparatusDto} from "./dto/delete-apparatus.dto";

@ApiTags('Apparatuses')
@Controller('apparatuses')
export class ApparatusesController {

    constructor(private apparatusesService: ApparatusesService) {
    }

    @ApiOperation({summary: 'Create apparatus'})
    @ApiResponse({status: 201, type: Apparatus})
    @Post()
    create(@Body() ApparatusDto: CreateApparatusDto) {
        return this.apparatusesService.createApparatus(ApparatusDto);
    }

    @ApiOperation({summary: 'Get all apparatuses'})
    @ApiResponse({status: 200, type: [Apparatus]})
    @Get()
    getAll() {
        return this.apparatusesService.getAllApparatus();
    }

    @Delete()
    deleteById(@Body() apparatusDto: DeleteApparatusDto) {
        return this.apparatusesService.deleteApparatus(apparatusDto);
    }
}
