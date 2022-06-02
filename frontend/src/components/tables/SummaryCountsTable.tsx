import React from 'react';
import { ISummaryCountData } from '../../types/upload';

interface SummaryCountsTableProps {
    items: ISummaryCountData[];
    deleteSummary: (id: string, date: string) => void;
}

const SummaryCountsTable = (props: SummaryCountsTableProps) => {

    const dateConvertToView = (str: string): string => {
        const dateStr = str.split('T');
        const parseDate = dateStr[0].split('-');
        const res = `${parseDate[2]}.${parseDate[1]}.${parseDate[0]}`;
        return res;
    }

    const dateConvertToDelete = (str: string): string => {
        const dateStr = str.split('T');
        const parseDate = dateStr[0].split('-');
        const res = `${parseDate[0]}-${parseDate[1]}-${parseDate[2]}`;
        return res;
    }

    const columns = [
        { id: '1', label: 'Дата' },
        { id: '2', label: 'Площадка' },
        { id: '3', label: 'Строк' },
        { id: '4', label: 'Действия' },

    ];

    return (

        <div className='w-100 overflow-auto'>
            <table className="table table-small">
                <thead className="position-sticky top-0 z-1 bg-white ">
                    <tr >
                        {columns.map(item => <th key={item.id}>{item.label}</th>)}
                    </tr>
                </thead>

                <tbody className="border-top-0">
                    {props.items.map((item, ind) => <tr key={ind}>
                        <td>{dateConvertToView(item.date)}</td>
                        <td>{item.plant.name}</td>
                        <td>{item.count}</td>
                        <td className='p-1'>
                            <button
                                onClick={e => {
                                    e.preventDefault();
                                    props.deleteSummary(item.plantId, dateConvertToDelete(item.date))
                                }}
                                className="btn btn-sm btn-danger shadow-none">X</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default SummaryCountsTable;