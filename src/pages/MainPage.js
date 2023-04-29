import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import 'bootstrap/dist/css/bootstrap.css';
import {Col, Row} from "react-bootstrap";
import {$host} from "../http/axiosAPI";
import TypeBar from "../components/TypeBar";
import {getStocksByType} from "../http/StockAPI";
import {getModeOfData} from "../http/EisApi";
import DataMode from "../components/DataMode";
import ButtonMode from "../components/ButtonMode";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

const MainPage = observer(() => {
    const {services, stocks} = useContext(Context)
    const [mode, setMode] = useState({mode:0, methods:''})
    const socket = new SockJS('http://localhost:2728/ws');
    const stompClient = Stomp.over(socket);

    useEffect(() => {
        $host.get('/eis/services').then((response) => {
            services.setServices(response.data)
        })
    }, [])
    useEffect(() => {
        stompClient.connect({}, () => {
            console.log('STOMP connection opened.');
        });
    }, [services.selected]);

    useEffect(() => {
        getModeOfData(services.selected).then(data => {
            setMode(data)
        })
    }, [services.selected])


    return (<Row className="g-0">
            <Col md={1} className="mt-2" style={{width: 250}}>
                <TypeBar/>
            </Col>
            {mode === 1 ? <DataMode webSocket={stompClient} /> : mode === 2 ? <ButtonMode webSocket={stompClient}/> : null}
        </Row>
    );
});

export default MainPage;