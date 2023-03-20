import React, { Component, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import solidGauge from "highcharts/modules/solid-gauge";
import highchartsMore from "highcharts/highcharts-more";

highchartsMore(Highcharts);
solidGauge(Highcharts);

interface Props {
    score: number;
}

function HealthScore({ score }: Props) {
    
    const [options] = useState({
        chart: {
            type: "gauge",
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: '80%'
        },
        title: {
            text: ''
        },
        pane: {
            startAngle: -90,
            endAngle: 89.9,
            background: null,
            center: ['50%', '75%'],
            size: '110%'
        },
        yAxis: {
            min: 0,
            max: 100,
            tickPixelInterval: 72,
            tickPosition: 'inside',
            tickColor: Highcharts.defaultOptions.chart?.backgroundColor || '#FFFFFF',
            tickLength: 20,
            tickWidth: 2,
            minorTickInterval: null,
            labels: {
            distance: 20,
            style: {
                fontSize: '14px'
            }
            },
            plotBands: [{
            from: 0,
            to: 50,
            color: '#DF5353', // green
            thickness: 20
            }, {
            from: 50,
            to: 70,
            color: '#DDDF0D', // yellow
            thickness: 20
            }, {
            from: 70,
            to: 100,
            color: '#55BF3B', // red
            thickness: 20
            }]
        },
        series: [
          {
            name: 'HealthScore',
            data: [score]
          }
        ]
    });

    return (
      <div className="app">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    );
}

export default HealthScore;
