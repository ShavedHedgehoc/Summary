import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Can } from './cans.model';

@Injectable()
export class CansService {

    constructor(@InjectModel(Can) private canRepository: typeof Can) { }

    async findOrCreateCan(name: string) {
        const [can, _] = await this.canRepository.findOrCreate({ where: { name: name } });
        return can;
    }

}
