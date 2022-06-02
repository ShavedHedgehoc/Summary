import { Injectable } from '@nestjs/common';
import { CreateSummaryDto } from "./dto/create-summary.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Summary, SummaryCreationAttrs } from './summary.model';
import { PlantsService } from '../plants/plants.service';
import { BatchesService } from '../batches/batches.service';
import { ProductsService } from 'src/products/products.service';
import { ConveyorsService } from '../conveyors/conveyors.service';
import { ApparatusesService } from '../apparatuses/apparatuses.service';
import { CansService } from '../cans/cans.service';
import { Product } from '../products/product.model';
import { GetSummaryDto } from './dto/get-summary.dto';
import sequelize from 'sequelize';
import { Plant } from '../plants/plants.model';
import { DeleteSummaryDto } from './dto/delete-summary.dto';
import { LabRecord } from "../labrecords/labrecords.model";
import { raw } from "express";
import { LabStatus } from "../labstatuses/labstatuses.model";
import { User } from "../users/users.model";
import { Batch } from "../batches/batches.model";
import { Apparatus } from "../apparatuses/apparatuses.model";
import { Conveyor } from "../conveyors/conveyors.model";
import { Can } from "../cans/cans.model";


@Injectable()
export class SummaryService {

    constructor(
        @InjectModel(Summary) private summaryRepository: typeof Summary,
        private plantService: PlantsService,
        private batchService: BatchesService,
        private productService: ProductsService,
        private conveyorService: ConveyorsService,
        private apparatusService: ApparatusesService,
        private canService: CansService
    ) {
    }

    async createSummary(dto: CreateSummaryDto) {

        const plant = await this.plantService.findOrCreatePlant(dto.plant);
        const batch = await this.batchService.findOrCreateBatch(dto.batch);
        const product = await this.productService.findOrCreateProduct(String(dto.product));
        const conveyor = await this.conveyorService.findOrCreateConveyor(String(dto.conveyor));
        const apparatus = await this.apparatusService.findOrCreateApparatus(String(dto.apparatus));
        const can = await this.canService.findOrCreateCan(String(dto.can));
        const date = new Date(dto.date);

        const summary = await this.summaryRepository.create(<SummaryCreationAttrs>{
            "date": date,
            "plantId": plant.id,
            "batchId": batch.id,
            "productId": product.id,
            "conveyorId": conveyor.id,
            "apparatusId": apparatus.id,
            "canId": can.id,
            "plan": dto.plan,
            "prodMonth": dto.prodMonth,
            "expired": dto.expired,
            "comments": dto.comments
        });

        return summary;
    }

    async getSummary() {

        const summaryRows = await this.summaryRepository.findAll({ include: { all: true } });
        return summaryRows;
    }

    async getSummarybyId(id: string) {

        const summaryRows = await this.summaryRepository.findOne({
            where: { id: Number(id) },
            include: [
                {
                    model: LabRecord,
                    as: 'labRecords',
                    include: [
                        { model: LabStatus },
                        { model: User }
                    ]
                }, Batch, Product, Apparatus, Can, Conveyor],
                order: [
                    [{ model: LabRecord, as: 'labRecords' }, 'timeStamp', 'DESC']
                ],   
        });
        return summaryRows;
    }



    async getSummaryByDateAndPlant(query) {
        const summaryRows = await this.summaryRepository.findAll({

            where: {
                date: query.date,
                plantId: Number(query.plantId)
            },
            include: [
                {
                    model: LabRecord,
                    as: 'labRecords',
                    include: [
                        { model: LabStatus },
                        { model: User }
                    ]
                }, Batch, Product, Apparatus, Can, Conveyor


            ],
            order: [
                ['id', 'ASC'],
                [{ model: LabRecord, as: 'labRecords' }, 'timeStamp', 'DESC']
            ],


            // {all: true}
        });
        return summaryRows;
    }

    async getSummaryReportCounts() {
        const today = new Date();

        const countRows = await this.summaryRepository.findAll({
            order: [
                ['date', 'ASC']
            ],
            attributes: [

                'date',
                'plantId',
                [sequelize.fn('COUNT', sequelize.col('Summary.id')), 'count'],

            ],
            include: [{
                model: Plant,
                attributes: ['name']
            }],
            group: [
                'date',
                'plantId',
                'plant.id'
            ],
        })

        return countRows;
    }

    async deleteSummaryByDatePlant(dto: DeleteSummaryDto) {
        console.log('start');

        console.log(dto);
        const userToDelete = await this.summaryRepository.destroy({
            where: {
                plantId: Number(dto.plantId),
                date: dto.date
            }
        }).then(
            function (rowDeleted) {
                if (rowDeleted > 1) {
                    return rowDeleted
                }
            }, function (err) {
                return err
            }
        )
    }

    async getSummaryIdsByDateAndPlant(query) {
        const a = []
        const summaryIds = await this.summaryRepository.findAll({
            attributes: [
                'id'
            ],
            where: {
                date: query.date,
                plantId: Number(query.plantId)
            },
            order: [
                ['id', 'ASC'],
            ],
        });
        summaryIds.map(item => a.push(item.id))
        // return summaryIds;
        return a;
    }
}
