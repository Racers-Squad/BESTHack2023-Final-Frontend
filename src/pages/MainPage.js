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
    const [mode, setMode] = useState({mode: 0, methods: ''})
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        $host.get('/eis/services').then((response) => {
            services.setServices(response.data)
        })
    }, [])
    const getState = (mode) =>{
        switch (mode){
            case 1:
                return <DataMode userId={userId}/>
            case 2:
                return <ButtonMode userId={userId} commands={services.commands}/>
            default:
                return null
        }
    }
    useEffect(() => {
        getModeOfData(services.selected).then(data => {
            setMode(data)
            services.setCommands(data.methods)
            setUserId(data.userId)
        })
    }, [services.selected])


    return (<Row className="g-0">
            <Col md={1} className="mt-2" style={{width: 250}}>
                <TypeBar/>
            </Col>
            <Col>
                {getState(mode.mode)}
            </Col>

        </Row>
    );
});

export default MainPage;