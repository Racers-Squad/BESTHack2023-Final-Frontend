import {observer} from "mobx-react-lite";
import React, {useContext, useRef, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {Context} from "../index";
import {executeCommand} from "../http/EisApi";

const MyModal = observer(({show,onHide}) => {
    const {services, modal} = useContext(Context)
    const [formValues, setFormValues] = useState([]);

    const handleInputChange = (e,id, index) => {
        const { name, value } = e.target;
        const newValues = [...formValues];
        newValues[index] = { id, value };
        setFormValues(newValues);
    };

    const handleSubmit = () => {
        let result = []
        formValues.map((val)=> result.push({id:val.id, value:val.value}))
        executeCommand({id: modal.command.id, args:result})
    };
    return (
        <Modal centered show={show}>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Введите параметры команды
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {modal.command.params.map((attr, index) => <Form.Control value={formValues[index]?.value || ""}
                                                                    onChange={(e) => handleInputChange(e,attr.id, index)} style={{marginBottom:10}} key={attr.id} placeholder={attr.hint} id={attr.id}
                                                                    type="text"
                                                                    name={attr.caption}/>)}
                    <Button variant="outline-danger" style={{float:"left", marginTop:10}} onClick={onHide}>Close</Button>
                    <Button variant="outline-success" style={{float:"right", marginTop:10}} onClick={() => {
                        handleSubmit()
                    }}>Execute</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
});


export default MyModal;