import { Module } from '@nestjs/common';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Summary} from "./summary.model";
import {UsersModule} from "../users/users.module";
import { ApparatusesModule } from '../apparatuses/apparatuses.module';
import { BatchesModule } from '../batches/batches.module';
import { CansModule } from '../cans/cans.module';
import { ConveyorsModule } from '../conveyors/conveyors.module';
import { PlantsModule } from '../plants/plants.module';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [SummaryController],
  providers: [SummaryService],
  imports:[
      SequelizeModule.forFeature([Summary]),
      ApparatusesModule,
      BatchesModule,
      CansModule,
      ConveyorsModule,
      PlantsModule,
      ProductsModule
  ]

})
export class SummaryModule {}
