import { Module } from '@nestjs/common';
import { ConveyorsController } from './conveyors.controller';
import { ConveyorsService } from './conveyors.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Conveyor } from './conveyors.model';

@Module({
  controllers: [ConveyorsController],
  providers: [ConveyorsService],
  imports: [SequelizeModule.forFeature([Conveyor])],
  exports: [ConveyorsService]
})
export class ConveyorsModule { }
