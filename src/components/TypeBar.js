import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Card, ListGroup} from "react-bootstrap";
import {Context} from "../index";
import 'bootstrap/dist/css/bootstrap.css';

const TypeBar = observer(() => {
    const {services} = useContext(Context)
    //сортировать данные по возрастанию


    return (<Card style={{
        width: 230, boxShadow: "6px 5px 18px 15px rgba(34, 60, 80, 0.2)", left: 0, marginLeft: 10, marginTop: 50
    }}>
        <ListGroup
            id="listGroup"
            color="primary"
            label="Категории" style={{height: 500}} activeKey="0">
            {services.services.map(serv => <ListGroup.Item id={serv.id} style={{
                height: 50, paddingBottom: 5, paddingTop: 5, cursor: "pointer"
            }}
                                                           active={serv.id === services.selected}
                                                           onClick={() => services.setSelected(serv.id)}
                                                           value={serv.id}
                                                           key={serv.id}>{serv.name}</ListGroup.Item>)}

        </ListGroup>
    </Card>);
});

export default TypeBar;