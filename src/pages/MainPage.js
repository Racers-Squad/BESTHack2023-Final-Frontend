import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import 'bootstrap/dist/css/bootstrap.css';
import {Col, Row} from "react-bootstrap";
import {$host} from "../http/axiosAPI";
import TypeBar from "../components/TypeBar";
import {getStocksByType} from "../http/StockAPI";
import Pagination from "../components/Pagination";
import StockList from "../components/StockList";

const MainPage = observer(() => {
    const {services, stocks} = useContext(Context)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(8)

    useEffect(() => {
        $host.get('/eis/services').then((response) => {
            services.setServices(response.data)
        })
    }, [])

    useEffect(() => {
        getStocksByType(services.selected).then(data => {
            stocks.setStocks(data)
        })
    }, [services.selected])

    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = stocks.stocks.slice(firstPostIndex, lastPostIndex)

    return (<Row className="g-0">
            <Col md={1} className="mt-2" style={{width: 250}}>
                <TypeBar/>
            </Col>
            <Col md={10} style={{marginLeft:20}}>
                <Pagination totalPosts={stocks.stocks.length} postsPerPages={postsPerPage}
                            setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                <StockList stocks={currentPosts}/>
            </Col>
        </Row>
    );
});

export default MainPage;