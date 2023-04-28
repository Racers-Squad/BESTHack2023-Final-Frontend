import React from 'react';
import {useHistory} from "react-router-dom";
import {STOCK_PAGE} from "../utils/const";
import {Text} from "@nextui-org/react";
import 'bootstrap/dist/css/bootstrap.css';

const StockItem = ({stock}) => {

    const history = useHistory()
    return (
        <tr>
            <td><Text id="ProductItemText"
                      style={{cursor: "pointer", textAlign: "center"}}
                      onClick={() => history.push(STOCK_PAGE + '/' + stock.code)}>{stock.code}</Text></td>
            <td style={{textAlign: "center"}}>{stock.name}</td>
            <td style={{textAlign: "center"}}>{stock.lastPrice}</td>
            <td style={{textAlign: "center"}}>{stock.min}</td>
            <td style={{textAlign: "center"}}>{stock.max}</td>
            <td style={{textAlign: "center"}}>{stock.dateOfLastDeal}</td>
        </tr>
    );
};

export default StockItem;