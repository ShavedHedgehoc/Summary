import { Module } from '@nestjs/common';
import { BoilsController } from './boils.controller';
import { BoilsService } from './boils.service';


@Module({
  controllers: [BoilsController],
  providers: [BoilsService]
})
export class BoilsModule {}
