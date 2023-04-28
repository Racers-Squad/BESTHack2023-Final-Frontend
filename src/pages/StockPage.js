import React, {useEffect, useLayoutEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/StockPage.css';
import {getStockByCode} from "../http/StockAPI";
import {Card, Col, Row, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {Text} from "@nextui-org/react";
import {BsGraphUp} from "react-icons/bs";
import {BiCandles} from "react-icons/bi";
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts/highstock'
import {connect, sendConfig} from "../http/SocketAPI";


const StockPage = () => {
    const [value, setValue] = useState(1);
    const [curStock, setStock]
        = useState({code: '', name: '', lastPrice: '', min: '', max: '', dateOfLastDeal: ''});
    const [price, setPrice] = useState(0);
    let code = window.location.href
    code = code.replace('http://localhost:3000/stock/', '')
    useLayoutEffect(() => {
        getStockByCode(code).then((data)=>{
            setStock(data)
        })
    }, [])


    const handleChange = (val) => setValue(val);

    const prices = [{
        x: '2022-01-01',
        open: 50.25, high: 52.50, low: 49.75, close: 51.25
    }, {
        x: '2022-01-02',
        open: 51.50, high: 53.75, low: 50.75, close: 52.00
    }, {
        x: '2022-01-03',
        open: 51.75, high: 53.00, low: 50.25, close: 50.50
    }, {
        x: '2022-01-04',
        open: 50.75, high: 51.25, low: 48.50, close: 49.25
    }, {
        x: '2022-01-05',
        open: 49.50, high: 50.25, low: 48.75, close: 50.00
    }, {
        x: '2022-01-06',
        open: 49.75, high: 50.50, low: 49.00, close: 49.50
    }, {
        x: '2022-01-07',
        open: 49.25, high: 50.50, low: 48.50, close: 50.25
    }]
    const plot = (mode) => {
        const options1 = {
            rangeSelector: {
                selected: 1,
            },
            chart: {
                type: "candlestick",
            },
            title: {
                text: `${curStock.code}`,
            },
            xAxis: {
                scrollablePlotArea: {
                    maxWidth: 1,
                },
                zoomEnabled: true,
                width: "100%",
                range: 10000,
            },
            series: [
                {
                    step: "center",
                    name: "test",
                    data: prices.map((price) => [
                        price.closeTime,
                        price.open,
                        price.high,
                        price.low,
                        price.close,
                    ]),
                    type: "candlestick",

                },
            ],
        };

        const options = {
            time: {
                useUTC: true,
            },
            title: {
                text: `${curStock.code}`
            },
            navigator: {
                enabled: true,
            },
            scrollbar: {
                enabled: true,
            },
            rangeSelector: {
                selected: 1,
            },
            xAxis: {
                scrollablePlotArea: {
                    maxWidth: 1,
                },
                zoomEnabled: true,
                width: "100%",
                range: 10000,
                units: [["hour", [1]]],
            },
            yAxis: {
                title: {
                    margin: -20,
                    style: {
                        color: "white",
                        fontWeight: 800,
                        opacity: 0.7,
                    },
                },
            },
            series: [{
                data: [1, 20, 3, 45, 5, 84, 7]
            }]
        }
        switch (mode) {
            case 1:
                return <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            case 2:
                return <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={"stockChart"}
                    options={options1}
                />
        }

    }

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
                <Row className="m-5">{plot(value)}</Row>
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
};

export default StockPage;