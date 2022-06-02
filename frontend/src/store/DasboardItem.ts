import { makeAutoObservable } from "mobx";
import { getSummaryById } from '../http/summaryAPI';

class DashboardItem {
    data=[];
    constructor(){
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