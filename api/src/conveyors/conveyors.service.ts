import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Conveyor } from './conveyors.model';

@Injectable()
export class ConveyorsService {

    constructor(@InjectModel(Conveyor) private conveyorRepository: typeof Conveyor) { }

    async findOrCreateConveyor(name: string) {
        const [conveyor, _] = await this.conveyorRepository.findOrCreate({ where: { name: name } });
        return conveyor;
    }
}
