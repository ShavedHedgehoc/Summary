import React, {useEffect, useState} from 'react';
import {getSummaryByDatePlantId} from "../http/summaryAPI";
import {getLabStatuses} from "../http/labStatusAPI";
import LabModal from "../components/LabModal";
import {fetchUsers} from "../http/userAPI";

interface ILaboratory {
    id: number;
    date: string;
    plantId: number;
    batchId: number;
    productId: number;
    conveyorId: number;
    apparatusId: number;
    canId: number;
    plan: number;
    prodMonth: string;
    expired: string;
    comments: string;
    createdAt: string;
    updatedAt: string;
    labRecords: ILabRecord[];
    batch: {
        id: number;
        name: string;
    };
    product: {
        id: number;
        name: string;
    };
    apparatus: {
        id: number;
        name: string;
    };
    conveyor: {
        id: number;
        name: string;
    };
    can: {
        id: number;
        name: string;
    };

}

interface ILabRecord {
    id: number;
    summaryId: number;
    userId: number;
    labStatusId: number;
    timeStamp: string;
    labStatus: {
        id: number;
        name: string;
    }
}

interface ILabStatus {
    id: number;
    name: string;
}


const Laboratory: React.FC = (): JSX.Element => {
    const [labData, setLabData] = useState<ILaboratory[]>([])
    const [labStateData, setLabStateData] = useState<ILabStatus[]>([])
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [id, setId] = useState<number>();

    const fetchSummary = async (plantId: number, date: string) => {
        await getSummaryByDatePlantId(plantId, date).then(res => {
            console.log(res);
            setLabData(res)
        })
    }

    const fetchLabStatus = async () => {
        await getLabStatuses().then(res => setLabStateData(res));
    }
    const hideAddWindow = () =>{
        setModalVisible(false);
        fetchSummary(1, '2022-05-23');
    }

    useEffect(() => {
        fetchSummary(1, '2022-05-23');
        fetchLabStatus();
    }, [])



    const columns = [
        { id: '4', label: '????????????????' },        
        {id: '2', label: '??????????????'},
        {id: '3', label: '??????????'},
        
        {id: '5', label: '??????????????'},
        {id: '6', label: '??????????????'},
        {id: '7', label: '????????'},
        {id: '8', label: '????????????'},
        {id: '9', label: '????????????????'},

    ];
    return (
        <div className="container-fluid mw-100 vh-100">
            <div className="d-flex align-item-center justify-content-center pt-4 ">
                <div>
                    <h1>?????????????? ?????????? ??????????????????????</h1>
                </div>
            </div>
            <div className="flex-fill d-flex flex-row overflow-hidden pt-4 pb-4">
                <table className="table">
                    <thead>
                    <tr>
                        {columns.map(item =>
                            <td key={item.id}>{item.label}</td>
                        )}

                    </tr>
                    </thead>
                    <tbody>
                    {labData.map(item =>
                        <tr key={item.id}>
                            <td>{item.conveyor.name}</td>
                            <td>{item.product.name}</td>
                            <td>{item.batch.name}</td>
                            
                            <td>{item.apparatus.name}</td>
                            <td>{item.can.name}</td>
                            <td>{item.plan}</td>                            
                            <td>{item.labRecords.length > 0 ? item.labRecords[0].labStatus.name : "-"}</td>
                            <td>
                                <button className="btn btn-sm btn-info shadow-none"
                                onClick={
                                    ()=>{
                                        setId(item.id);
                                        setModalVisible(true);
                                    }
                                }
                                >????????????????</button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <LabModal statuses={labStateData} id={id} show={modalVisible} onHide={() => hideAddWindow()}/>
        </div>
    )
}

export default Laboratory;