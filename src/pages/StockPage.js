import React, {useEffect, useLayoutEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/StockPage.css';
import {Card, Col, Row, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {Text} from "@nextui-org/react";
import {BsGraphUp} from "react-icons/bs";
import {BiCandles} from "react-icons/bi";
import {Stomp} from "@stomp/stompjs"
import SockJS from "sockjs-client";
import {observer} from "mobx-react-lite";
import Chart from "../components/Chart";


const StockPage = observer(() => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState(1);
    const [curStock, setStock]
        = useState({code: '', name: '', lastPrice: '', min: '', max: '', dateOfLastDeal: ''});
    const handleChange = (val) => setValue(val);
    const socket = new SockJS('http://localhost:2728/ws');
    const stompClient = Stomp.over(socket);
    let code = window.location.href
    code = code.replace('http://localhost:3000/stock/', '')
    useEffect(() => {
        stompClient.connect({}, () => {
            console.log('STOMP connection opened.');
            stompClient.subscribe('/topic/stock', (message) => {
                setMessages(JSON.parse(message.body).map(Number));
            });
            stompClient.send("/app/stock", {}, JSON.stringify({stock: code, chartType: value}))

        });
    }, [value]);

    useEffect(() => {
        console.log('Updated messages:', messages);
    }, [messages]);

    return (
        <Row className="g-0">
            <Row className="d-flex" style={{flexDirection: "row"}}>
                <div className="align-items-center d-flex"><Text
                    h2>{curStock.name}</Text><Text
                    css={{color: "gray", marginTop: 20, marginLeft: 20}}>{curStock.code}</Text></div>
                <Text h5>Акция обыкновенная</Text>
            </Row>
            <Col md={7} className="mt-2">
                <Row className="justify-content-end d-flex" style={{marginRight: 50}}>
                    <ToggleButtonGroup type="radio" name="options" value={value} style={{width: 100}}
                                       className="end-0 d-flex" onChange={handleChange}>
                        <ToggleButton variant="secondary" value={1}>
                            <BsGraphUp/>
                        </ToggleButton>
                        <ToggleButton variant="secondary" value={2}>
                            <BiCandles/>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Row>
                <Row className="m-5"><Chart data={messages} mode={value} code={code}/>></Row>
            </Col>
            <Col md={3} style={{marginRight: 30}}>
                <Card style={{width: 700, height: 600}}>
                    <Col>
                        <Row className="m-lg-4">
                            <Text h1>{50.50} ₽</Text>
                        </Row>
                    </Col>
                </Card>
            </Col>
        </Row>
    );
});

export default StockPage;