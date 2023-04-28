import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

export const connect = () => {
    const socket = new SockJS('http://localhost:2728/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/stock', message => {
            console.log(1)
            console.log(message)
        })
    });
}

export const disconnect = () => {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

export const sendConfig = (chartType, stock) => {
    stompClient.send("/app/stock", {}, JSON.stringify({stock:stock, chartType:chartType}));
}
