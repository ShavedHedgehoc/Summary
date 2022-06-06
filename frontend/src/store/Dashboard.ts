import { makeAutoObservable, runInAction } from "mobx";
import { getSummaryByDatePlantId, getSummaryById } from '../http/summaryAPI';

export interface ILabData {
    id: number | null;
    summaryId: number | null;
    userId: number | null;
    labStatusId: number | null;
    timeStamp: string;
    labStatus: {
        id: number | null;
        name: string;
    }
}

export interface IDashboardData {
    id: number | null;
    date: string;
    plantId: number | null;
    batchId: number | null;
    productId: number | null;
    conveyor: {
        conveyorId: number | null;
        name: string;
    }
    product: {
        productId: number | null;
        name: string;
    },
    batch: {
        id: number | null;
        name: string;
    },
    labRecords: ILabData[]|[];


    // "labRecords":[
    //     {"id":8,"summaryId":53,"userId":3,"labStatusId":1,"timeStamp":"2022-06-02T22:01:52.586Z","labStatus":{"id":1,"name":"Допуск"},"user":{"id":3,"name":"rtert","email":"rtreter","password":"retretre","createdAt":"2022-06-02T22:01:15.446Z","updatedAt":"2022-06-02T22:01:15.446Z"}}
    // ]



}

export interface IDashboard {
    data: IDashboardData[];
    fetch: (plantId: number, date: string) => void;
}

class Dashboard implements IDashboard {

    data = [];

    constructor() {
        makeAutoObservable(this);
    }

    async fetch(plantId: number, date: string) {
        await getSummaryByDatePlantId(plantId, date).then(res => {
            runInAction(() => {
                this.data = res;
            });
        })
    }

};
export default new Dashboard();