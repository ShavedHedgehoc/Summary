import {Module} from "@nestjs/common";

import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import {SummaryModule} from './summary/summary.module';
import {Summary} from "./summary/summary.model";
import {ConveyorsModule} from './conveyors/conveyors.module';
import {ApparatusesModule} from './apparatuses/apparatuses.module';
import {CansModule} from './cans/cans.module';
import {ProductsModule} from './products/products.module';
import {BatchesModule} from './batches/batches.module';
import {PlantsModule} from './plants/plants.module';
import {BoilsModule} from './boils/boils.module';
import {ConnectionsModule} from './connections/connections.module';
import {Apparatus} from "./apparatuses/apparatuses.model";
import {Can} from './cans/cans.model';
import {Batch} from './batches/batches.model';
import {Conveyor} from './conveyors/conveyors.model';
import {Plant} from './plants/plants.model';
import {Product} from './products/product.model';
import {LabStatusesModule} from './labstatuses/labstatuses.module';
import {LabStatus} from "./labstatuses/labstatuses.model";
import { LabRecordsModule } from './labrecords/labrecords.module';
import {LabRecord} from "./labrecords/labrecords.model";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '../.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            // host: process.env.POSTGRES_HOST,
            host: '172.23.0.2',
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [
                Apparatus,
                Batch,
                Can,
                Conveyor,
                Plant,
                Product,
                Summary,
                User,
                LabStatus,
                LabRecord,
            ],
            autoLoadModels: true
        }),
        UsersModule,
        SummaryModule,
        ConveyorsModule,
        ApparatusesModule,
        CansModule,
        ProductsModule,
        BatchesModule,
        PlantsModule,
        BoilsModule,
        ConnectionsModule,
        LabStatusesModule,
        LabRecordsModule,
    ]
})
export class AppModule {
}