import {Button, Form, FormControl, Modal} from "react-bootstrap";
import React, {useState} from "react";
import {createLabRecord} from "../http/labRecordAPI";


interface LabModalProps {
    statuses: {
        id: number;
        name: string;
    } [];
    id: number | undefined;
    show: boolean;
    onHide: () => void;
}

const LabModal = ({id, statuses, show, onHide}: LabModalProps) => {
    const [status, setStatus] = useState('-')

    const addLabRecord = () => {
        const formData = {
            "summaryId": id,
            "labStatusId": status,
            "userId": 3
        }
        createLabRecord(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Изменить статус
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Select className="shadow-none"
                                 value={status}
                                 onChange={(e) => {
                                     setStatus(e.target.value)
                                 }}
                    >
                        <option key="-" value="">Выберите статус</option>
                        {statuses &&
                            statuses.map(item =>
                                <option
                                    key={item.id}
                                    value={item.id}>
                                    {item.name}
                                </option>)
                        }
                    </Form.Select>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="outline-success shadow-none"
                    onClick={()=>addLabRecord()}
                >
                    Записать
                </Button>
                <Button
                    variant="outline-danger shadow-none"
                    onClick={onHide}
                >
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default LabModal;