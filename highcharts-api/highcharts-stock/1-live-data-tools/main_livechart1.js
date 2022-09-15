//https://jsfiddle.net/BlackLabel/ahd74kqn/
//https://jsfiddle.net/BlackLabel/ahd74kqn/

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
            //rightChart.series.forEach(s => s.setData(data.right.slice(2)));
			rightChart.series[0].setData(data.right.slice(2));
			
        });
    }

    const leftChart = H.stockChart('container1', {
        title: {
            text: 'LATITUDE'
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
			text: 'LONGITUDE'
		},		
		yAxis:[{
			height: '33%',
		},
		{
			height: '33%',
			top: '33%',
		},
		{
			height: '33%',
			top: '66%',
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
		stockTools:{
			gui: {
				buttons: [ 'indicators', 
				'separator', 
				'simpleShapes', 
				'lines', 
				'crookedLines', 
				'measure', 
				'advanced', 
				'toggleAnnotations', 
				'separator', 
				'verticalLabels', 
				'flags', 
				'separator', 
				'zoomChange', 
				'fullScreen', 
				'typeChange', 
				'separator', 
				'currentPriceIndicator', 
				'saveChart', 
				'customDataGroups'
				],
				
				definitions: {
					customDataGroups:{
						symbol: "circle.svg"
					}
				}
			}
			
		},
		series: [{
			yAxis:0,
			id: 'main-series',
			dataGrouping:{
				enabled:false,
				}
			},
			{
			yAxis:1,
			type: 'sma',
			linkedTo: 'main-series',
			params: {
				period: 2
				},
			dataGrouping: {
				firstAnchor: 'start',
				lastAnchor: 'end'
				}
			},
			{
			type: 'macd',
			linkedTo: 'main-series',
			yAxis: 2,
			dataGrouping: {
				firstAnchor: 'start',
				lastAnchor: 'end'
				}
		}]

			/*
			{
				yAxis:1,
				
				dataGrouping: {
					approximation: 'average',
				}
				
				
			{
			{
				yAxis:2,
				dataGrouping: {
					approximation: 'sum',
				}
			}
			]
			*/
	});
	
    setInterval(()=> {
        yieldData();
    }, 2000);

}(Highcharts));