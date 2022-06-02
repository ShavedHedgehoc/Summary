import React, {useEffect, useState} from 'react';
import {deleteUser, fetchUsers} from "../http/userAPI";
import {Button, Container, TabContainer, Table} from "react-bootstrap";
import UserAddModal from "../components/UserAddModal";

interface IData {
    id: string;
    name: string;
    email: string;
}

const Home1: React.FC = (): JSX.Element => {
    const [data, setData] = useState<IData[]>([])
    const [rowDeleted, setRowDeleted]=useState<boolean>(false)
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    useEffect(() => {
            fetchUsers().then(data => setData(data))
        }, []
    )

    const deleteRow=(id:string)=>{
        deleteUser(id).then(
            ()=>fetchUsers().then(data=>setData(data))
        )
    }

    const hideAddWindow = () =>{
        setModalVisible(false);
        fetchUsers().then(data=>setData(data));
    }

    return (
        <div className="container-fluid mw-100 vh-100">
            <div className="row pt-4">
                <div className="col-2"></div>
                <div className="col-8">
                    <table className="table">
                        <thead className="table-dark">
                        <tr>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Actions</td>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>
                                    <Button
                                        variant="btn btn-small btn-danger shadow-none"
                                        onClick={()=>deleteRow(item.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button
                        // type="button"

                        className=" btn btn-success shadow-none"
                        onClick={() => setModalVisible(true)}>Add +
                    </button>
                </div>

            </div>

            <UserAddModal show={modalVisible} onHide={() => hideAddWindow()}/>
        </div>
    )
}

export default Home1;