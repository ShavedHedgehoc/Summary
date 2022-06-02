import {Body, Controller, Post} from '@nestjs/common';
import {LabRecordsService} from "./labrecords.service";
import {CreateLabRecordDto} from "./dto/create-labrecord.dto";

@Controller('lab_records')
export class LabRecordsController {
    constructor(private labRecordsService: LabRecordsService) {
    }
    @Post()
    create(@Body() dto: CreateLabRecordDto) {
        return this.labRecordsService.createLabRecord(dto);
    }
}
