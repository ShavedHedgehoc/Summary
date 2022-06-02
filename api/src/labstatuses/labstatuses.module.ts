import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {LabStatus} from "./labstatuses.model";
import {LabStatusesController} from "./labstatuses.controller";
import {LabStatusesService} from "./labstatuses.service";

@Module({
    imports:[SequelizeModule.forFeature([LabStatus])],
    controllers: [LabStatusesController],
    providers: [LabStatusesService]
})
export class LabStatusesModule {}
