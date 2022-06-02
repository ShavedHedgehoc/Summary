import {Controller, Get} from '@nestjs/common';
import {LabStatusesService} from "./labstatuses.service";

@Controller('lab_statuses')
export class LabStatusesController {
    constructor(private labStatusesService: LabStatusesService) {
    }

    @Get()
    getAll() {
        return this.labStatusesService.getLabStatuses();
    }
}
