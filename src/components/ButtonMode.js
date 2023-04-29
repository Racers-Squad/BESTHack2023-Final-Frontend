import React, {useState} from 'react';
import {Button, Row} from "react-bootstrap";
import Modal from "./Modal";
//@TODO сделать отчистку данных после нажатия на сабмит формы

const ButtonMode = (webSocket) => {
    const [commands, setCommands]
        = useState([])
    webSocket.subscribe('/topic/stock', (message) => {
        setCommands(JSON.parse(message.body).map(Number));
    });

    return (<Row className="g-0 justify-content-center" style={{display: 'flex'}}>
            {commands.map(command => {<Button  onClick={() => <Modal command={command}/>}/>})}
        </Row>);
};

export default ButtonMode;