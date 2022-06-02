import { Module } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';
import { Plant } from './plants.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [PlantsService],
  controllers: [PlantsController],
  imports:[SequelizeModule.forFeature([Plant])],
  exports: [PlantsService]
})
export class PlantsModule { }
