import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {MAIN_PAGE, REGISTER_PAGE} from "../utils/const";
import {useHistory} from "react-router-dom";
import "./css/LoginPage.css"
import {login} from "../http/userAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import 'bootstrap/dist/css/bootstrap.css';


const LoginPage = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async (e) => {
        try {
            let data = await login(email, password);
            let user1 = {email: data.sub}
            user.setUser(user1)
            user.setIsAuth(true)
            history.push(MAIN_PAGE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (<Container id="flex-container">
        <Card id="form" className="align-items-center">
            <h1 style={{fontSize: 40, marginTop: 40}}>BESTHack 2023</h1>
            <h1 style={{fontSize: 40, marginBottom: 10, marginTop: 10, textAlign:"center"}}>Investment banking technologies</h1>
            <h1 style={{fontSize: 40, marginBottom: 20, marginTop: 10}}>Racers Squad</h1>
            <h2 className="m-auto">Вход</h2>
            <Form className="d-flex flex-column">
                <Form.Group>
                    <h5 className="mt-5">E-mail</h5>
                    <Form.Control id="log_email" className="mb-4" placeholder="Введите ваш e-mail...."
                                  type="email" onChange={e => setEmail(e.target.value)}></Form.Control>
                    <div id="log_err_msg" style={{color: "red"}}></div>
                </Form.Group>
                <Form.Group style={{paddingBottom: 20}}>
                    <h5 className="mt-4">Пароль</h5>
                    <Form.Control id="log_pass" className="mb-4" placeholder="Введите ваш пароль...."
                                  type="password" onChange={e => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button className="w-20 align-self-center" variant="secondary" color="gray"
                        style={{marginLeft: 10, marginRight: 10, width: 100, height: 40}} onClick={() => {
                    click()
                }}>Вход</Button>
                <a onClick={() => {
                    history.push(REGISTER_PAGE)
                }} className="align-self-center mt-3 mb-3"
                   style={{fontSize: 17, color: "black", textDecoration: "none", cursor: "pointer"}}>У меня нету
                    аккаунта</a>
            </Form>
        </Card>
    </Container>);
});

export default LoginPage;