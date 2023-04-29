import React from 'react';
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import {observer} from "mobx-react-lite";

const Chart = observer(({mode, data, code}) => {

    const plot = (mode) => {
        const options1 = {
            rangeSelector: {
                selected: 1,
            },
            chart: {
                type: "candlestick",
            },
            title: {
                text: `${code}`,
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    format: '{value:%Y-%m-%d}'
                },
                scrollablePlotArea: {
                    maxWidth: 1,
                },
                zoomEnabled: true,
                width: "100%",
                range: 10000,
            },
            series: [
                {
                    step: "center",
                    name: "test",
                    data: data.map((price) => [
                        price.closeTime,
                        price.open,
                        price.high,
                        price.low,
                        price.close,
                    ]),
                    type: "candlestick",

                },
            ],
        };

        const options = {
            time: {
                useUTC: true,
            },
            title: {
                text: `${code}`
            },
            navigator: {
                enabled: true,
            },
            scrollbar: {
                enabled: true,
            },
            rangeSelector: {
                selected: 1,
            },
            xAxis: {
                scrollablePlotArea: {
                    maxWidth: 1,
                },
                zoomEnabled: true,
                width: "100%",
                range: 10000,
                units: [["hour", [1]]],
            },
            yAxis: {
                title: {
                    margin: -20,
                    style: {
                        color: "white",
                        fontWeight: 800,
                        opacity: 0.7,
                    },
                },
            },
            series: [{
                data: data
            }]
        }
        switch (mode) {
            case 1:
                return <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            case 2:
                return <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={"stockChart"}
                    options={options1}
                />
        }

    }


    return (
        <div>
            {plot(mode)}
        </div>
    );
});

export default Chart;