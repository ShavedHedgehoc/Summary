import React from 'react';
import { ISummaryUploadData } from '../../types/upload';

interface UploadTableProps {
    items: ISummaryUploadData[];
}

const UploadTable = (props: UploadTableProps) => {

    const columns = [
        { id: '1', label: '' },
        { id: '2', label: 'Варка' },
        { id: '3', label: 'Продукт' },
        { id: '4', label: 'Конвейер' },
        { id: '5', label: 'Аппарат' },
        { id: '6', label: 'Емкость' },
        { id: '7', label: 'План' },
        { id: '8', label: 'Месяц выпуска' },
        { id: '9', label: 'Годен до' },
        { id: '10', label: 'Примечание' },
    ];

    return (

        <div className='w-100 overflow-auto'>
            <table className="table">
                <thead className="position-sticky top-0 z-1 bg-white ">
                    <tr >
                        {columns.map(item => <th key={item.id}>{item.label}</th>)}
                    </tr>
                </thead>

                <tbody className="border-top-0">
                    {props.items.map((item, ind) => <tr key={ind}>
                        <td>{item.uploaded === undefined ? "-" : item.uploaded ? <>&#10004;</> : <>&#10008;</>}</td>
                        <td>{item.batch}</td>
                        <td>{item.product}</td>
                        <td>{item.conveyor}</td>
                        <td>{item.apparatus}</td>
                        <td>{item.can}</td>
                        <td>{item.plan}</td>
                        <td>{item.prodMonth}</td>
                        <td>{item.expired}</td>
                        <td>{item.comments}</td>                        
                    </tr>)}
                </tbody>

            </table>
        </div>


    );
};

export default UploadTable;