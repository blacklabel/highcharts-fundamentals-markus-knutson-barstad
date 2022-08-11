let largest = 0;

const createSeriesData = () => {
    const data = [];

    Array.from(Array(3)).forEach(n => {
        n = (Math.random() * 100) * 0.1;

        if(n > largest)
            largest = n;
        
        data.push(n);
    });

    return data;
}

const chartData = Array.from(Array(3)).map(()=>createSeriesData());

Highcharts.chart('container', {
    chart: {
        type: 'column'
    },

    title: null,
    
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: 'MAX',
                filter: {
                    property: 'y',
                    operator: '==',
                    value: largest
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
        max: largest * 2,
        
        endOnTick: false,   // we need to set endOnTick to false in order to disable rounding up of yAxis.max
        tickInterval: 2.5,  // and i set tickInterval to make the ticks on this chart fit the one shown in the screenshot 

        plotLines: [{
            color: '#92C08A',
            width: 4,
            value: 1.5 * largest,
            dashStyle: "Dash",
        }],
    },

    series: [{
        name: 'Tokyo',
        data: chartData[0]
    }, {
        name: 'New York',
        data: chartData[1]
    }, {
        name: 'London',
        data: chartData[2]
    }]
});