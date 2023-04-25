import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import 'bootstrap/dist/css/bootstrap.css';

const MainPage = observer(() => {
    const {user} = useContext(Context)
    return (
        <div>
            <h1>{user.user.email}</h1>
        </div>
    );
});

export default MainPage;