import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Card, ListGroup} from "react-bootstrap";
import {Context} from "../index";
import {BsReception0, BsReception1, BsReception2, BsReception3, BsReception4} from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.css';

const TypeBar = observer(() => {
    const {services} = useContext(Context)

    function inRange(x, min, max) {
        return ((x - min) * (x - max) <= 0);
    }

    const getIcon = (delay) => {
        if (inRange(delay, 0, 5)) {
            return <BsReception4 style={{float: "right"}}/>
        }
        if (inRange(delay, 6, 10)) {
            return <BsReception3 style={{float: "right"}}/>
        }
        if (inRange(delay, 11, 15)) {
            return <BsReception2 style={{float: "right"}}/>
        }
        if (inRange(delay, 16, 20)) {
            return <BsReception1 style={{float: "right"}}/>
        }
        if (inRange(delay, 21, 25)) {
            return <BsReception1 style={{float: "right"}}/>
        }
        if (inRange(delay, 26, 100)) {
            return <BsReception0 style={{float: "right"}}/>
        }
    }
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
                                                           active={serv.name === services.selected}
                                                           onClick={() => services.setSelected(serv.name)}
                                                           value={serv.name}
                                                           key={serv.name}>{serv.name}{getIcon(serv.delay)}<h6
                style={{float: "right", marginRight: 5}}>{serv.delay}</h6></ListGroup.Item>)}

        </ListGroup>
    </Card>);
});

export default TypeBar;