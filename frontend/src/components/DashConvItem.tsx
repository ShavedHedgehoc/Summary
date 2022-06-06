import React from 'react';
import { Card } from 'react-bootstrap';
import { ILabData } from '../store/Dashboard';

interface IConvCardProps {
    convName: string;
    marking: string;
    batch: string;
    convStatus: [];
}

const DashConvItem = ({ convName, marking, batch, convStatus }: IConvCardProps) => {
    return (
        <Card className='card h-100'>
            <Card.Header className='h5'>Фасовка (Кнопочки жмут мастера-бригадиры)</Card.Header>
            <Card.Body className="pt-1 pb-1">                
                <div className='row h-100'>
                    <div className='col-3 d-flex flex-column h-100 justify-content-between'>
                        <div className='d-flex flex-row align-self-center my-1 h-25'>
                            <div className='h4 p-1 m-0'>Конвейер</div>
                        </div>
                        <div className='d-flex flex-row my-1 h-75 align-self-center'>
                            <div className='display-1 p-1 m-0'>{convName}</div>
                        </div>
                    </div>
                    <div className='col-4 d-flex flex-column h-100 justify-content-around'>                        
                                <div className='d-flex flex-row justify-content-start'>
                                    <div className='h3 p-1 m-0'>{marking}</div>
                                </div>
                                <div className='d-flex flex-row justify-content-start'>
                                    <div className='h3 p-1 m-0'>{batch}</div>
                                </div>
                            {/* </div>

                        </div> */}

                    </div>
                    <div className='col-5 h-100 d-flex flex-column justify-content-center align-items-center'>
                        <div className='h3 p-1 m-0'>Тут будет статус</div>
                    </div>
                </div>

            </Card.Body>
        </Card>
    )
}

export default DashConvItem;