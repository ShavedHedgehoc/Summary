import React, { useEffect, useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { getAllSummary } from '../http/summaryAPI';


// interface IData {

// }

const Summary: React.FC = (): JSX.Element => {
    const [data, setData] = useState();
    const [plant, setPlant] = useState();
    const [summaryDate, setSummaryDate] = useState();

    // useEffect(() => {
    //     getAllSummary().then(
    //         res => setData(res)
    //     ) 
    // }, []);


    return (
        <div className="container-fluid mw-100 vh-100">
            <div className='row'>
                <div className='col-4'>
                <Form>
                    <Form.Group>
                    <Form.Label>Площадка</Form.Label>
                        <Form.Select >
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Дата</Form.Label>
                    <FormControl
                        type="date"
                        

                    />
                    </Form.Group>
                </Form></div>
                <div className='col-4'></div>
                
                <div className='col-4'></div>
            </div>

        </div>
    )
}

export default Summary;