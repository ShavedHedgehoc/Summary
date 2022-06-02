import {Button, Form, FormControl, Modal} from "react-bootstrap";
import React, {useState} from "react";
import {createUser} from "../http/userAPI";


interface UserAddModalProps {
    show: boolean;
    onHide: () => void;
}

const UserAddModal = ({show, onHide}: UserAddModalProps) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const addUser = () => {
        const formData = {
            'name':name,
            'email':email,
            'password':password
        }
        createUser(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Add user
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormControl
                        className="mb-2"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </FormControl>
                    <FormControl
                        className="mb-2"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </FormControl>
                    <FormControl
                        placeholder="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </FormControl>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="outline-success"
                    onClick={addUser}
                >
                    Add
                </Button>
                <Button
                    variant="outline-danger"
                    onClick={onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default UserAddModal;