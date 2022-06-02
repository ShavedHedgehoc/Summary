import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";

import {LabRecord, LabRecordCreationAttrs} from "./labrecords.model";
import {CreateLabRecordDto} from "./dto/create-labrecord.dto";

@Injectable()
export class LabRecordsService {
    constructor(@InjectModel(LabRecord) private labRecordRepository: typeof LabRecord) {
    }

    async createLabRecord(dto: CreateLabRecordDto) {
        const time = new Date();//add UTC convert
        const labRecord = await this.labRecordRepository.create(<LabRecordCreationAttrs>{
            summaryId: dto.summaryId,
            labStatusId: dto.labStatusId,
            userId: dto.userId,
            timeStamp: time,
        });
        return labRecord;
    };
}
