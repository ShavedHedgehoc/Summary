import React from 'react';
import { Card } from 'react-bootstrap';
import { ILabData } from '../store/Dashboard';

interface IBoilCardProps {
    appName: string;    
    boilStatus: [];
}

const DashBoilItem = ({ appName, boilStatus }: IBoilCardProps) => {
    return (
        <Card className='card h-100'>
            <Card.Header className='h5'>Варка (Кнопочки жмут технологи)</Card.Header>
            <Card.Body className="pt-1 pb-1">                
                <div className='row h-100'>
                    <div className='col-3 d-flex flex-column h-100 justify-content-between'>
                        <div className='d-flex flex-row align-self-center my-1 h-25'>
                            <div className='h4 p-1 m-0'>Аппарат</div>
                        </div>
                        <div className='d-flex flex-row my-1 h-75 align-self-center'>
                            <div className='display-1 p-1 m-0'>{appName}</div>
                        </div>
                    </div>                    
                    <div className='col-9 h-100 d-flex flex-column justify-content-center align-items-center'>
                        <div className='h3 p-1 m-0'>Тут будет статус</div>
                    </div>
                </div>

            </Card.Body>
        </Card>
    )
}

export default DashBoilItem;