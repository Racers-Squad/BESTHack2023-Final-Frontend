import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import MyModal from "./Modal";
import {Context} from "../index";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {observer} from "mobx-react-lite";

const ButtonMode = observer(({userId}) => {
    const {services, modal} = useContext(Context)
    const socket = new SockJS('http://localhost:2728/ws');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
        console.log('STOMP connection opened.');
    });
    stompClient.subscribe('/user/' + userId + '/queue/events', (message) => {
        setItems(JSON.parse(message.body).map(Number));
    });
    const [items, setItems]
        = useState(null)

    const getData = (item) => {
        if (!item.incrementDelete) {
            return <tr>
                {item.map(value => <td>{value.value}</td>)}
            </tr>
        }
    }
    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = (command) => {
        modal.setCommand(command)
        setShowModal(true);
    };
    return (
        <Col><Row className="g-0 justify-content-center" style={{display: 'flex', overflowY: "scroll", height: "40%"}}>
            {services.commands.map(command =>
                <Button title={command.description} onClick={() => {
                    handleButtonClick(command)
                }} key={command.id} variant="secondary" style={{width: 200, height: 50}}>{command.caption}</Button>
            )}
            {showModal && <MyModal show={showModal} onHide={() => setShowModal(false)}/>}
        </Row>
            <Row className="g-0 justify-content-center" style={{display: 'flex', overflowY: "scroll", height: "40%"}}>
                {(items !== null) && <table>
                    <tbody>
                    <tr>{items.fields.map(item => (
                        <td>{item}</td>
                    ))}</tr>
                    {(items.fullOrIncrement || items.data.length !== 0) && items.map(item => (
                        getData(item)
                    ))}
                    </tbody>
                </table>}
            </Row></Col>);
});

export default ButtonMode;