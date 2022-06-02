import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {LabStatus} from "./labstatuses.model";

@Injectable()
export class LabStatusesService {
    constructor(@InjectModel(LabStatus) private labStatusesRepository: typeof LabStatus) {
    }

    async getLabStatuses() {
        const labStatuses = await this.labStatusesRepository.findAll();
        return labStatuses;
    }

}
