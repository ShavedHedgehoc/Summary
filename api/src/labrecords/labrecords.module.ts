import {Module} from '@nestjs/common';
import {LabRecordsController} from "./labrecords.controller";
import {LabRecordsService} from "./labrecords.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {LabRecord} from "./labrecords.model";


@Module({
    providers: [LabRecordsService],
    controllers: [LabRecordsController],
    imports: [
        SequelizeModule.forFeature([LabRecord])
    ]
})
export class LabRecordsModule {
}
