/*
	
	find the chart-walls svgs skew/rotation and hook that up to the projections

*/
const RATIO = 0.005;

const updatePoint = (p,dimension) => p.update({dimension: p["dimension"] + RATIO});

const clearScreen = (toClear) => {
  console.log("RESIZED");
  if(toClear){
    toClear.forEach(obj => obj.destroy());
  }
}

const chart =  Highcharts.chart('container', {
    chart: {
        type: 'scatter3d',
		backgroundColor: "#252525",
		margin:0,
		spacing:0,
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
        },
		events: {
			render: function () {
				const c = this;
				const ren = this.renderer;
				const xWallPos = (c.series[0].data[0].plotX/2) + (c.series[0].data[0].marker.radius)
				const yWallPos = c.series[0].data[0].plotY + (c.series[0].data[0].marker.radius/2)
				
				const wallRotation = 3.5;
				
				if(c.dot){c.dot.destroy()}
				c.dot = "";
				
				c.dot=
					ren.circle(
						xWallPos + 50,
						yWallPos,
						30
					)
					.attr({
						fill:"yellow",
						transform: "skewY(-" + wallRotation + ")"
					});
				c.dot.add().toFront();
				//c.projections.forEach(p => p.add().toFront());
			}
		}
    },

	legend: {
		enabled:false
	},

    title: {
        text: null
    },
	
	/*
    plotOptions: {
        series: {
            point: {
                events: {
					update: event => {
						this.options = event.options
					}
				}
			}
		}
	},*/

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
				x:5, 
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
				x:3.5, 
				y:6, 
				z:7,
				color:"gray",
				marker: {
					radius:3,
				}
			},
        ]
    },
	
	]
});

console.log(chart);
const earth = chart.series[0].data[1];


const revolve = () => {
	updatePoint(earth, earth.x);
}

//setInterval(revolve, 100);
/*
*/
//console.log(chart.series[0].data[0]);

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