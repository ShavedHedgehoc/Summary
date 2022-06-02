import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Batch } from './batches.model';

@Injectable()
export class BatchesService {

    constructor(@InjectModel(Batch) private batchRepository: typeof Batch) { }

    async findOrCreateBatch(name: string) {
        const [batch, _] = await this.batchRepository.findOrCreate({ where: { name: name } });
        return batch;
    }
}
