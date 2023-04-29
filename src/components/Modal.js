import {observer} from "mobx-react-lite";
import React, {useContext, useRef, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {Context} from "../index";
import {executeCommand} from "../http/EisApi";

const Modal = observer(({command}) => {
    const {services} = useContext(Context)
    const formRef = useRef();
    const [onHides, setOnHides] = useState(false)
    const onHide = () =>{
        setOnHides(!onHides)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        const result = []
        for (let [id, name, value] of formData) {
            result.push({id:id, name:name, value:value})
        }
        executeCommand({id:command.id, args: result}, services.selected)
    };

    return (
        <Modal
            show={true}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Введите параметры команды
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form ref={formRef}>
                    {command.attributes.map(attribute =><Form.Control placeholder={attribute.hint} id={attribute.id} type="text" name={attribute.caption}/>)}
                    <Button type="submit" onSubmit={handleSubmit} onClick={onHide}>Submit</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
});


export default Modal;