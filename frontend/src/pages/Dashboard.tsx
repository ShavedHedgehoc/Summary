import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RouteParams } from '../router/index';

import { observer } from "mobx-react-lite";
import DashboardStore, {IDashboardData} from '../store/Dashboard';
import DashItem from '../components/DashItem';

const Dashboard: React.FC = observer((): JSX.Element => {

    const perPage = 3;
    const date = '2022-05-23';
    const today = new Date();
    


    const params = useParams<RouteParams.DASHBOARD_PARAMETER>();
    const plantId = params.plant_id;

    const [page, setPage] = useState(0);
    const [visibleItems, setVisibleItems] = useState<IDashboardData[]>([]);

    const changePage = () => {

        const len = DashboardStore.data.length;

        if (len > 0) {
            const pages = Math.ceil(len / perPage);
            if (page < pages - 1) {
                setPage(page + 1)
            } else {
                setPage(0)
            }
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            changePage();            
        }, 5000)
        return () => clearTimeout(timeout);
    }, [page])

    useEffect(() => {        
            setVisibleItems(DashboardStore.data.slice(page * perPage, (page + 1) * perPage))        
    }, [page])


    useEffect(() => {
        const interval = setInterval(() => {
            DashboardStore.fetch(Number(plantId), date);
        }, 2000);
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        DashboardStore.fetch(Number(plantId), date).then(
            res=>setVisibleItems(DashboardStore.data.slice(page * perPage, (page + 1) * perPage))        
        );              
    }, [])

    return (
        <div className="vh-100 d-flex flex-column overflow-hidden" id="container">
            <div className='row p-4'>
                <div className='col-1 h-100 d-flex flex-column justify-content-center'></div>
                <div className='col-2 h-100 d-flex flex-column justify-content-center p-3 border rounded border-secondary'>
                    <div className='d-flex align-item-center justify-content-end pe-2'>Сервисная фигня, потом не будет</div>
                    <div className='d-flex align-item-center justify-content-end pe-2'>Page: {page}</div>
                    <div className='d-flex align-item-center justify-content-end pe-2'>Len: {DashboardStore.data.length}</div>
                    <div className='d-flex align-item-center justify-content-end pe-2 '>{String(today)}</div>
                </div>
                <div className='col-6 h-100 d-flex flex-column justify-content-center'>
                    <div className='d-flex flex-row justify-content-center'>                        
                        <div className='display-2 m-0 p-2'>Сводка по производству</div>
                    </div>
                </div>                
                <div className='col-2 h-100 d-flex flex-column justify-content-center'>
                    <div className='d-flex flex-row justify-content-between'>
                        <div className='h2 m-0 p-2'>Площадка: </div>
                        <div className='h2 m-0 p-2'>Пискаревка</div>
                    </div>
                    <div className='d-flex flex-row justify-content-between'>
                        <div className='h3 m-0 p-2'>Дата: </div>
                        <div className='h3 m-0 p-2'>03/06/2022</div>
                    </div>
                </div>
                <div className='col-1 h-100 d-flex flex-column justify-content-center'></div>
            </div>            
            <div className="flex-fill d-flex flex-column overflow-auto pt-3 " id="dash-view">
                {visibleItems.map((item, index) =>
                    <DashItem visible={true} data={item} key={index} />
                )}
            </div>
        </div>
    )
})

export default Dashboard;