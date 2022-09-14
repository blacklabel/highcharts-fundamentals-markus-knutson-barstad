(function (H){
    const data ={
        prevLong: 0.0,
		left: [],
	};
	
    const yieldData = () => {
        Highcharts.getJSON('http://api.open-notify.org/iss-now.json', (resp) => {
            
            let currentPoint = parseFloat(resp.iss_position.longitude) - data.prevLong;

            data.left.push([
                parseFloat(resp.timestamp),
                currentPoint
                ]);
            data.prevLong = parseFloat(resp.iss_position.longitude);
            leftChart.series.forEach(s => s.setData(data.left.slice(2)));
        });
    }

    const leftChart = H.stockChart('container', {
        title: {
            text: 'LEFT'
        },

        yAxis:[{
            height: '30%',
            offset: 0,
        },
        {
            height: '30%',
            top: '30%',
        },
        {
            height: '30%',
            top: '60%',
        }],

        series: [
            {
                yAxis:0,
                dataGrouping:{
                    enabled:false,
                }
            },
            {
                yAxis:1,
                
                dataGrouping: {
                    approximation: 'average',
                    enabled: true,
                    forced:true,

                }
            },
            {
                yAxis:2,
                dataGrouping: {
                    approximation: 'sum',
                    enabled: true,
                }
            },
        ]
    });

    setInterval(()=> {
        yieldData();
    }, 300);

}(Highcharts));