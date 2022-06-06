import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { IDashboardData } from '../store/Dashboard';
import DashBoilItem from './DashBoilItem';
import DashConvItem from './DashConvItem';
import DashLabItem from './DashLabItem';

interface IDashItemProps {
    visible: boolean;
    data: IDashboardData;
}

const DashItem = ({ visible, data }: IDashItemProps) => {
    return (
        <div className="container-fluid">
            <div className='d-flex flex-row justify-content-center'>
                <div className='col-3 m-0 '>
                    <DashConvItem
                        convName={data.conveyor.name}
                        marking={data.product.name}
                        batch={data.batch.name}
                        convStatus={[]}
                    />
                </div>
                
                <div className='col-3 m-0 '>
                    <DashBoilItem
                        appName={'54'}
                        boilStatus={[]}                        
                    />
                </div>
                <div className='col-3 m-0 '>
                    <DashLabItem
                        data={data.labRecords.length > 0 ? data.labRecords[0] : null}
                    />
                </div>
            </div>
        </div>
    )
}

export default DashItem;