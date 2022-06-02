import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Apparatus } from "./apparatuses.model";
import { CreateApparatusDto } from "./dto/create-apparatus.dto";
import { DeleteApparatusDto } from "./dto/delete-apparatus.dto";

@Injectable()
export class ApparatusesService {

    constructor(@InjectModel(Apparatus) private apparatusRepository: typeof Apparatus) {
    }

    async createApparatus(dto: CreateApparatusDto) {
        const apparatus = await this.apparatusRepository.create(dto);
        return apparatus;
    }

    async getAllApparatus() {
        const apparatuses = await this.apparatusRepository.findAll();
        return apparatuses;
    }

    async findOrCreateApparatus(name: string) {
        const [apparatus, _] = await this.apparatusRepository.findOrCreate({ where: { name: name } });
        return apparatus;
    }

    async deleteApparatus(dto: DeleteApparatusDto) {

    }
}
