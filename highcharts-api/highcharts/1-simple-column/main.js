let largest = 0;
const createSeriesData = () => {
    const data = [];

    Array.from(Array(3)).forEach(n => {
        n = (Math.random() * 100) * 0.1;
        if(n > largest)
            largest = n
        
        data.push(n);
    });

    return data;
}

const chartData = Array.from(Array(3)).map(()=>createSeriesData());

const c = Highcharts.chart('container', {
    chart: {
        type: 'column',

        events: {
            load(){ // this is how i found i could set the yAxis.max as required by the task
                
                let max = 0;
                
                this.series.forEach((s) => {
                    if(max < s.dataMax)
                        max = s.dataMax
                });

                this.yAxis[0].update({
                    max: max * 2
                })

            }
        }
    },

    title: null,
    
    plotOptions: {
         series: {
            
            dataLabels: {
                enabled: true,
                format: 'MAX',
            },

            events: {
                afterAnimate: function(){

                    /*
                        - i am trying to set the labels filter here, so that only the biggest col(s) have the "MAX" label
                    */
                    this.chart.options.plotOptions.series.dataLabels.filter = {
                            property: 'y',
                            operator: '==',
                            
                            value: function(){
                                let max = 0;
                                
                                this.chart.series.forEach((series) => {
                                    if(max < series.dataMax)
                                        max = series.dataMax
                                });

                                return max;
                            }
                        }
                        
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

        plotLines: [{
            color: '#92C08A',
            width: 4, // also i added this to make the dashes more apparent
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