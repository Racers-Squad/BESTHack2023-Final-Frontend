import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {publicRoutes} from "../routes";
import {LOGIN_PAGE} from "../utils/const";
import {observer} from "mobx-react-lite";
import 'bootstrap/dist/css/bootstrap.css';

const AppRouter = observer(() => {
    return (<Switch>
            {publicRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component} exact/>)}
            <Redirect to={LOGIN_PAGE}/>
        </Switch>

    );
});

export default AppRouter;