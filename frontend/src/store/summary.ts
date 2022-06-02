import {makeAutoObservable} from "mobx";
import {getSummaryIdsByDatePlantId} from "../http/summaryAPI";

export interface ISummaryStore {
    ids: any[];
    page: number;
}


class Summary  implements ISummaryStore{
    
    ids = []
    page = 0


    constructor() {        
        makeAutoObservable(this)
    }


    changePage() {
        if (this.ids.length > 0) {
            const pages = Math.ceil(this.ids.length / 6);
            console.log(this.ids.length);
            console.log(pages);
            
            if (this.page < pages-1){
                this.page = this.page + 1
            } else {
                this.page = 0
            }
        }
    }

    async fetch(plantId: number, date: string) {
        await getSummaryIdsByDatePlantId(plantId, date).then(res => {
            this.ids = res;
            this.page = 0;
        })
    }

    get idsArr(){
        return this.ids.slice(this.page*6,(this.page+1)*6)
    }
}

export default new Summary();