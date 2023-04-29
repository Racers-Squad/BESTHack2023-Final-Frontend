import React, {useState} from 'react';
import {observer} from "mobx-react-lite";

const DataMode = observer(({webSocket}) => {
    const [items, setItems]
        = useState({caption: '', fields: [], fullOrIncrement: false, dataRows: []})
    webSocket.subscribe('/topic/stock', (message) => {
        setItems(JSON.parse(message.body).map(Number));
    });
    const getData = (item) => {
        if (!item.incrementDelete) {
            return <tr>
                <td>{item.field}</td>
                <td>{item.data}</td>
            </tr>
        }
    }
    return (<table>
        <tbody>
        {(items.fullOrIncrement || items.data.length !== 0) && items.map(item => (
            getData(item)
        ))}
        </tbody>
    </table>);
});

export default DataMode;