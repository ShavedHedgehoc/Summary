import React from 'react';
import { Card } from 'react-bootstrap';
import { ILabData } from '../store/Dashboard';

interface ILabCardProps {
    data: ILabData | null;
}

const DashLabItem = ({ data }: ILabCardProps) => {
    return (
        <Card className='card h-100'>
            <Card.Header className='h5'>Лаборатория (Кнопочки жмут инженеры-химики)</Card.Header>
            <Card.Body className="m-0 p-0">
                <div className='col-12 h-100 d-flex flex-column justify-content-center align-items-center'>
                    <div className='display-4 p-1'>
                    {/* <div className='display-3 p-1'> */}
                        {data && data.labStatus.name}
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default DashLabItem;