import { Module } from '@nestjs/common';
import { BatchesController } from './batches.controller';
import { BatchesService } from './batches.service';
import { Batch } from './batches.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [BatchesController],
  providers: [BatchesService],
  imports:[SequelizeModule.forFeature([Batch])],
  exports:[BatchesService]
})
export class BatchesModule {}
