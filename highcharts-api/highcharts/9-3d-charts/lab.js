//https://jsfiddle.net/mushigh/7u4br3n5/
//https://www.highcharts.com/blog/products/highcharts/3d-solar-system-animation/
const chart = Highcharts.chart('container', {
    chart: {
        type: 'bubble',
    },

    legend: {
        enabled: false
    },

    title: {
        text: ''
    },


    xAxis: {
		tickPositions:[0,20,40,60,80,100],
		max: 100,
		min: 0,
		showLastTick:true,
        title: {
            text: ''
        },
    },

    yAxis: {
		tickPositions:[0,20,40,60,80,100],
        startOnTick: true,
        endOnTick: true,

    },

    series: [{
        data: [
			{ x: 50, y: 22, z: 5},
            { x: 50, y: 30, z: 10},
  //          { x: 50, y: 50, z: 20},
        ]
    }]

});
function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}




const small = chart.series[0].data[0];
const big = chart.series[0].data[1];
//const biggest = chart.series[0].data[2];
console.log(chart.series[0].data);
//const newPos = rotate(big.x, big.y, small.x, small.y, 15);

const revolve = () => {
	//const newBigPos = rotate(biggest.x, biggest.y, big.x, big.y, 7.5);
	//big.update({x:newBigPos[0],y:newBigPos[1]});
	
	const newSmallPos = rotate(big.x, big.y, small.x, small.y, 45);
	small.update({x:newSmallPos[0],y:newSmallPos[1]});
	
}

setInterval(revolve, 200);