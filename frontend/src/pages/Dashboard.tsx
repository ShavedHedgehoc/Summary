import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {RouteParams} from '../router/index';

import Summary from "../store/summary";
import {observer} from "mobx-react-lite";
import DashboardItem from '../components/DasboardItem';

const Dashboard: React.FC = observer((): JSX.Element => {

    const today = new Date();

    const params = useParams<RouteParams.DASHBOARD_PARAMETER>();
    const plantId = params.plant_id;
    
    

    useEffect(() =>{
        const timeout= setTimeout(()=>{
            Summary.changePage();
            console.log('change page');
        },4000)
        return ()=>clearTimeout(timeout);
    },[Summary.page])


    useEffect(()=>{
        const interval =setInterval(()=>{
            Summary.fetch(2, '2022-05-23');
            console.log('refetch summary');
        }, 60000);
        return ()=>clearInterval(interval);
    },[])

    useEffect(() => {
        Summary.fetch(2, '2022-05-23');
        console.log('init fetch');
        
    }, [])   


    

    return (
        <div className="vh-100 d-flex flex-column overflow-hidden">
            <div className="d-flex flex-column align-item-center justify-content-center pt-4">
                <div className='d-flex align-item-center justify-content-center'><h1>Сводка по производству</h1></div>
                <div className='d-flex align-item-center justify-content-end pe-2'>Page: {Summary.page}</div>        
                <div className='d-flex align-item-center justify-content-end pe-2 '>{String(today)}</div>                 
            </div>
            <div className="flex-fill d-flex flex-column overflow-hidden flex-start p-0">
            
            {Summary.idsArr.map(i=>
            
            <DashboardItem id={i} key={i}/>
            
            )}
            
            </div>
            
        </div>
        
            

            

        
    )
})

export default Dashboard;