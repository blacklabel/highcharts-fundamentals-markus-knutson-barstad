const createSeriesData = () => {
    const data = [];

    Array.from(Array(3)).forEach(() => {
        data.push(
            (Math.random() * 100) * 0.1
        );
    });

    return data;
}

const chartData = Array.from(Array(3)).map(()=>createSeriesData());

Highcharts.chart('container', {
    chart: {
        type: 'column',

        events: {
            load(){
                let max = 0;
                
                this.series.forEach((s) => {
                    if(max < s.dataMax)
                        max = s.dataMax
                });

                console.log(this.yAxis[0].plotLinesAndBands);

                this.yAxis[0].update({
                    max: max * 2,

                    plotLines: [{
                        color: '#92C08A',
                        width: 4, // also i added this to make the dashes more apparent
                        value: 1.5 * max,
                        dashStyle: "Dash",
                    }],

                })
                
            }
        }
    },

    title: {
        text:null,
    },

    plotOptions:{
        series: {
            dataLabels: {
                enabled:true,
                formatter: function(){                
                    if(this.point.y === (this.series.yAxis.max / 2))
                        return "MAX";
                }
            }
        }
    },

    xAxis: {
        categories: [
            'Jan',
            'Feb',
            'Mar',
        ],
    },

    yAxis: {     
        endOnTick: false,   // we need to set endOnTick to false in order to disable rounding up of yAxis.max
        tickInterval: 2.5,  // and i set tickInterval to make the ticks on this chart fit the one shown in the screenshot 
    },

    series: [{
        name: 'Tokyo',
        data: chartData[0],
    }, {
        name: 'New York',
        data: chartData[1]
    }, {
        name: 'London',
        data: chartData[2]
    }]
});