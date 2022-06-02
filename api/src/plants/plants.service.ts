import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Plant } from './plants.model';

@Injectable()
export class PlantsService {
    constructor(@InjectModel(Plant) private plantRepository: typeof Plant) { }

    async findOrCreatePlant(name: string) {
        const [plant,_] = await this.plantRepository.findOrCreate({ where: { name: name } });
        return plant;
    }

    async getAllPlants() {
        const plants = await this.plantRepository.findAll();
        return plants;
    }
}






