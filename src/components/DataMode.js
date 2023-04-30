import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

const DataMode = observer(({userId}) => {
    const [items, setItems]
        = useState({caption: '', fields: [], fullOrIncrement: false, dataRows: []})
    const socket = new SockJS('http://localhost:2728/ws');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
        console.log('STOMP connection opened.');
    });
    stompClient.subscribe('/user/' + userId + '/queue/events', (message) => {
        setItems(JSON.parse(message.body).map(Number));
    });
    const getData = (item) => {
        if (!item.incrementDelete) {
            return <tr>
                {item.map(value => <td>{value.value}</td>)}
            </tr>
        }
    }
    return (<table>
        {(items !== null) && <tbody>
        <tr>{items.fields.map(item => (
            <td>{item}</td>
        ))}</tr>
        {(items.fullOrIncrement || items.data.length !== 0) && items.map(item => (
            getData(item)
        ))}
        </tbody>}
    </table>);
});

export default DataMode;