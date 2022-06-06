import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import DashboardState from "../store/DasboardItem";

interface DashboardItemProps {
    id: number;
}

const DashboardItem: React.FC<DashboardItemProps> = observer(({ id }): JSX.Element => {    
    
    useEffect(()=>{
        DashboardState.fetch(id);
        console.log(DashboardState.data);
        
    },[])
    return (
        <div className="container-fluid">
            
            <div className='row flex flex-row align-items-center justify-content-center'>
                <div className='col-3 m-0 d-flex flex-column align-items-between justify-content-between'>
                    <Card>
                        <Card.Header>Конвейер</Card.Header>
                        <Card.Body className="m-0 p-0">
                            <div className='row'>
                                <div className='col-4 d-flex justify-content-center align-items-center'>
                                    <h1>{DashboardState.data.conveyor.name}</h1>
                                </div>
                                <div className='col-8'>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item> <div className='text secondary'>Ожидает допуска</div></ListGroup.Item>
                                        <ListGroup.Item>Фасуется</ListGroup.Item>
                                        <ListGroup.Item>Закончили</ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className='col-3 m-0 d-flex flex-column align-items-between justify-content-between'>
                    <Card >
                        <Card.Header>Продукт</Card.Header>
                        <Card.Body className="m-0 p-0">
                            <div className='row'>
                                <h1>{DashboardState.data.product.name}</h1>                                
                            </div>
                            <div className='row'>
                                <h1>123F2Y</h1>                                
                            </div>
                        </Card.Body>
                    </Card>
                </div>


                {/* <div className='col-2 m-0 d-flex flex-column align-items-between justify-content-between'>
                    <Card>
                        <div >Продукт</div>
                        <div ><h3>{item.conv}</h3></div>
                    </Card>

                </div>
                <div className='col-1 d-flex align-items-center justify-content-center'>
                    <h1>{item.name}</h1>
                </div>
                <div className='col-1 d-flex align-items-center justify-content-center'>
                    <h1>123В2Н</h1>
                </div>

                <div className='col-2 m-0 d-flex flex-column align-items-between justify-content-between'>
                    <div >Конвейер</div>
                    <div ><h3>{item.conv}</h3></div>
                </div> */}





            </div>
        </div>
    )
})

export default DashboardItem;