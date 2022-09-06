const chart =  Highcharts.chart('container', {
    chart: {
        type: 'scatter3d',
		backgroundColor: "#252525",
        options3d: {
            enabled: true,
            alpha: 7,
            beta: 45,
            depth: 900,
            viewDistance: 20,
            frame: {
                bottom: {
                    size: 1,
                    color: 'rgba(0,0,0,0.05)'
                }
            }
        }
    },

	legend: {
		enabled:false
	},

    title: {
        text: null
    },

    yAxis: {
        min: 0,
        max: 10,
		title: {
			text:'',
		}
    },
    xAxis: {
        min: 0,
        max: 10,
        
    },
    zAxis: {
		tickPositions: [0,5,10,15,20],
		max: 20,
		min:0,
    },
    series: [{
        data: [
            { 	//sun
				x:4.8, 
				y:6, 
				z:7,
				color:"yellow",
				marker: {
					radius:30,
				}
			},
			{ 	//earth
				x:4, 
				y:6, 
				z:7,
				color:"blue",
				marker: {
					radius:9,
				}
			},
			{ 	//moon
				x:3.8, 
				y:6, 
				z:7,
				color:"gray",
				marker: {
					radius:3,
				}
			},
			
			
			//X-projection
			{ 	//sun
				x:0, 
				y:6, 
				z:7,
				color:"yellow",
				marker: {
					radius:30,
				}
			},
			{ 	//earth
				x:0, 
				y:6, 
				z:7,
				color:"blue",
				marker: {
					radius:9,
				}
			},
			{ 	//moon
				x:0, 
				y:6, 
				z:7,
				color:"gray",
				marker: {
					radius:3,
				}
			},
			
			//X-projection
			{ 	//sun
				x:4.8, 
				y:6, 
				z:19,
				color:"yellow",
				marker: {
					radius:30,
				}
			},
			{ 	//earth
				x:4, 
				y:6, 
				z:19,
				color:"blue",
				marker: {
					radius:9,
				}
			},
			{ 	//moon
				x:3.8, 
				y:6, 
				z:19,
				color:"gray",
				marker: {
					radius:3,
				}
			},
        ]
    },
	
	]
});


const revolve = () => {
	console.log(chart.series[0]);
}

setInterval(revolve, 100);


function showValues() {
    document.getElementById('alpha-value').innerHTML = chart.options.chart.options3d.alpha;
    document.getElementById('beta-value').innerHTML = chart.options.chart.options3d.beta;
    document.getElementById('depth-value').innerHTML = chart.options.chart.options3d.depth;
}

// Activate the sliders
document.querySelectorAll('#sliders input').forEach(input => input.addEventListener('input', e => {
    chart.options.chart.options3d[e.target.id] = parseFloat(e.target.value);
    showValues();
    chart.redraw(false);
}));
/*
*/