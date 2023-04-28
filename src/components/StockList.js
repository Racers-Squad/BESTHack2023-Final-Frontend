import React from 'react';
import StockItem from "./StockItem";
import {Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';

const StockList = ({stocks}) => {
    return (
            <Table bordered hover style={{width: "100%", tableLayout: "fixed", padding: 10}}>
                <thead>
                <tr>
                    <th style={{textAlign: "center"}}>Code</th>
                    <th style={{textAlign: "center"}}>Name</th>
                    <th style={{textAlign: "center"}}>Last price</th>
                    <th style={{textAlign: "center"}}>Min</th>
                    <th style={{textAlign: "center"}}>Max</th>
                    <th style={{textAlign: "center"}}>Last date of deal</th>
                </tr>
                </thead>
                <tbody>
                {stocks.map((item) => (
                    <StockItem stock={item}/>
                ))}
                </tbody>
            </Table>
    );
};

export default StockList;