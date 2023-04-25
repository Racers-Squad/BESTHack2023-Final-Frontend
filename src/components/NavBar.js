import React, {useContext} from 'react';
import {Button, Nav, Navbar} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {LOGIN_PAGE, MAIN_PAGE} from "../utils/const";
import 'bootstrap/dist/css/bootstrap.css';

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()


    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.setItem('token', '')
    }

    return (
        <Navbar bg="light" variant="light">
            <Nav className="flex-column me-3" style={{marginLeft: 20}}>
                {!user.isAuth && <Button variant="secondary" onClick={() => {
                    history.push(LOGIN_PAGE)
                }}
                                         style={{width: 80}}>Вход</Button>}
                {user.isAuth && <div><Button variant="secondary" style={{marginLeft: 10}}
                                             onClick={() => {
                                                 logout()
                                             }}>Выход</Button></div>}
            </Nav>
            <NavLink style={{color: 'black', marginLeft: 20}} to={MAIN_PAGE}>Main</NavLink>
        </Navbar>);
});

export default NavBar;