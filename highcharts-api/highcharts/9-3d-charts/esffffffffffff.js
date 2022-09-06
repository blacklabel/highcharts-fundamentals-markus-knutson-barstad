/*
	
	find the chart-walls svgs skew/rotation and hook that up to the projections

	https://github.com/blacklabel/highcharts-fundamentals-markus-knutson-barstad/tree/highcharts/6-visible-points-zoom/highcharts-api/highcharts/9-3d-charts
	https://stackoverflow.com/questions/4255472/javascript-object-access-variable-property-by-name-as-string
	https://stackoverflow.com/questions/38704081/highcharts-3d-scatter-data-points-projections
	http://jsfiddle.net/worg6jLz/13/
	https://blacklabel.github.io/projections/
	
	
	you can try to inject an svg under the x and y axis svg, and see if rotations will apply then

*/



const RATIO = 0.05;

const hasPassedX = false; //x skal i en str8 verdilinje, når x er passert skal den minimeres igjen
const hasPassedZ = false; // z skal først bli større til midten av solen, 
//så skal den bli mindre til solen er passert, så større etter midten av solen igjen

function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}


const updateX = (p,val) => p.update({x: val});
const updateZ = (p,val) => p.update({z: val});


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
            //alpha: 5,
            //beta: 45,
			alpha: 45,
            beta: 1,
            depth: 1200,
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
				
				if(this.hasRendered){
					const xProj = document.getElementsByClassName("highcharts-series-1")[1];
					xProj.style.transformOrigin = "center";
					xProj.style.transform = "rotateY(50deg)";

					const zProj = document.getElementsByClassName("highcharts-series-2")[1];
					zProj.style.transformOrigin = "center";
					zProj.style.transform = "rotateY(55deg)";				
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
		tickInterval:2,
        min: 0,
        max: 10,
        
    },
    zAxis: {
		tickPositions: [0,1,2,3,4],
		max: 5,
		min:0,
    },
    series: [
		{data: [{ //sun
				x:5, 
				y:5, 
				z:2,
				color:"yellow",
				marker: {
					radius:25,
				}
			},{ 	//earth
				x:4, 
				y:5, 
				z:2,
				color:"blue",
				marker: {
					radius:9,
				}
			}]},
			
		{data:[{ //XWALL
			x:0, 
			y:5, 
			z:1,
			color:"yellow",
			marker: {
				symbol:"circle",
				radius:25,
			}
		},
		{ 	//earth
			x:0, 
			y:5, 
			z:1,
			color:"blue",
			marker: {
				symbol:"circle",
				radius:9,
			}
		}]},
		
		{data:[{ //ZWALL
			x:6.5, 
			y:4.8, 
			z:5,
			color:"yellow",
			marker: {
				symbol:"circle",
				radius:25,
			}
		}]}
	]
});

/*

const sun = chart.series[0].data[0];
const earth = chart.series[0].data[1];
console.log(earth.x);
console.log(earth.z);

const newPos = rotate(sun.x,sun.z,earth.x,earth.y,180);
updateX(earth,newPos[0]);
updateZ(earth,newPos[1]);

console.log(newPos);
const earthStart = 3;
const earthEnd = 7;


//const earthEnd = 7;

const earthZend = 3;
const earthZstart = 1;

const zHalf = 4.0;
const zWhole = 0.0;
let passedX = false;
let passedZ = true;

//mye tightere til planeten, trengs en måne også

const revolve = () => {

	
	if(earth.x >= earthEnd){
		passedX = true;
	}
	else if(earth.x <= earthStart){
		passedX = false;	
	}
	
	if(earth.z >= earthZend){
		passedZ = false;
	}else if(earth.z <= earthZstart){
		passedZ = true;
	}
	let offsetZ = passedZ? 0.05 : -0.05;
	let offsetX = passedX? -0.05 : 0.05;
	
	updateX(earth,offsetX);
	updateZ(earth, offsetZ);
}
*/
var r = 0;
const revolve = () => {
	console.log("awdawd");
	const earth = document.getElementsByClassName("highcharts-series-0")[1];
	earth.style.transform = "rotate(" + r + ")";
	r++;
	if(r > 360)
		r = 0;
}
setInterval(revolve, 100);
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