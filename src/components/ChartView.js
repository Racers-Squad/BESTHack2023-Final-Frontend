import React, {useContext} from 'react';
import {Context} from "../index";
import 'bootstrap/dist/css/bootstrap.css';

const ChartView = () => {

    const {services} = useContext(Context)
    const getSelectedChart = () => {
    }

    return (
        <>{getSelectedChart()}</>
    );
};

export default ChartView;