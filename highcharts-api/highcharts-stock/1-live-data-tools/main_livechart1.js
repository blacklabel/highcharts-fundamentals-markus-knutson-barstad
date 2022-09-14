(function (H){
    const data ={
        prevLong: 0.0,
		prevLat: 0.0,
		left: [],
		right: []
	};
	
    const yieldData = () => {
        Highcharts.getJSON('http://api.open-notify.org/iss-now.json', (resp) => {

			//left
            data.left.push([
                parseFloat(resp.timestamp),
                parseFloat(resp.iss_position.longitude) - data.prevLong
                ]);
            data.prevLong = parseFloat(resp.iss_position.longitude);
            leftChart.series.forEach(s => s.setData(data.left.slice(2)));
			
			//right
			data.right.push([
                parseFloat(resp.timestamp),
                parseFloat(resp.iss_position.latitude) - data.prevLat
                ]);
            data.prevLat = parseFloat(resp.iss_position.latitude);
            rightChart.series.forEach(s => s.setData(data.right.slice(2)));
			
        });
    }

    const leftChart = H.stockChart('container1', {
        title: {
            text: 'LEFT'
        },

        yAxis:[{
            height: '10%',
        },
        {
            height: '10%',
            top: '10%',
        },
        {
            height: '10%',
            top: '20%',
        }],
		
		
		plotOptions: {
			series: {
				dataGrouping: {
					enabled: true,
					groupAllPoints:true,
					groupPixelWidth:100,
				}
			}
		},
        series: [{
                yAxis:0,
                dataGrouping:{
                    enabled:false,
                }
            }]
    });
	
	const rightChart = H.stockChart('container2', {
	title: {
		text: 'RIGHT'
	},

	yAxis:[{
		height: '10%',
	},
	{
		height: '10%',
		top: '20%',
	},
	{
		height: '10%',
		top: '30%',
	}],
	plotOptions: {
		series: {
			dataGrouping: {
				enabled: true,
				groupAllPoints:true,
				groupPixelWidth:100,
			}
		}
	},
	series: [{
			yAxis:0,
			dataGrouping:{
				enabled:false,
			}
		},
		{
			yAxis:1,
			dataGrouping: {
				approximation: 'average',
			}
		},
		{
			yAxis:2,
			dataGrouping: {
				approximation: 'sum',
			}
		}]
});
	
	
    setInterval(()=> {
        yieldData();
    }, 2000);

}(Highcharts));