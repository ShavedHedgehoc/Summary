import { makeAutoObservable } from "mobx";
import { getSummaryById } from '../http/summaryAPI';

export interface IDashboardItemData {
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
    }
}

export interface IDashboardItem {
    data: IDashboardItemData;
    fetch: (id: number) => void;
}

class DashboardItem implements IDashboardItem {
    data = {
        'id': null,
        'date': '',
        'plantId': null,
        'batchId': null,
        'productId': null,
        'conveyor': {
            'conveyorId': null,
            'name': ''
        },
        'product': {
            'productId': null,
            'name': ''
        }
    };

    constructor() {
        makeAutoObservable(this);
    }

    async fetch(id: number) {
        await getSummaryById(id).then(res => {
            this.data = res;
            console.log(res);

        })
    }



};
export default new DashboardItem();