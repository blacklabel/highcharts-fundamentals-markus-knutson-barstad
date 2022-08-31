
const buildColors = (exclude) => ["red","green","blue","yellow"].filter(c => c !== exclude);

const randCol = (exclude) => Array.from(buildColors(exclude))[Math.floor(Math.random() * 3)];

// const collides = (first, second) => first.radius + second.radius <= Math.hypot(first.plotX - second.plotX, first.plotY - second.plotY);
// function circleIntersect(x0, y0, r0, x1, y1, r1) {
//     return Math.hypot(x0 - x1, y0 - y1) <= r0 + r1;
// }
//const getCoord = radius * Math.cos(Math.PI * 2 * angle / 360);

const getXlen = (p) => p.plotX + p.marker.width;
const getYlen = (p) => p.plotY + p.marker.height;

function is_collide( 
    minAx, minAy, maxAx, maxAy,
    minBx, minBy, maxBx, maxBy ) {
    const aLeftOfB = maxAx < minBx;
    const aRightOfB = minAx > maxBx;
    const aAboveB = minAy > maxBy;
    const aBelowB = maxAy < minBy;

    return !( aLeftOfB || aRightOfB || aAboveB || aBelowB );
}

const c = Highcharts.chart('container2', {
    chart: {
        type: 'packedbubble',
    	
    },

 	tooltip: {
 		enabled: false
 	},
	
	legend: {
		enabled: false,
	},

    plotOptions: {
    	packedbubble: {
     	   layoutAlgorithm: {
				splitSeries: false,
				dragBetweenSeries: true,
     	   }
    	}
	},

	series: [
		{
        	data: [
        		{value: 50, color:"red"}, 
        		{value: 12, color:"blue"},
        	],

        	point: {
        		events: {
        			update: event => {
        				this.color = event.options;
        			}
        		}
        	},
    	}
    ],
});


const runLoop = () => {
	c.series[0].data.forEach(pInQuestion => {

		c.series[0].data.filter(p => p.value !== pInQuestion.value).forEach(p => {
			
			const x1Start = pInQuestion.plotX;
			const x1End = getXlen(pInQuestion);
			const y1Start = pInQuestion.plotY;
			const y1End = getYlen(pInQuestion);

			const x2Start = p.plotX;
			const x2End = getXlen(p);
			const y2Start = p.plotY;
			const y2End = getYlen(p);
			

			if(is_collide(
				x1Start, y1Start, x1End, y1End, 
				x2Start, y2Start, x2End, y2End, 
				)){
				console.log("WOAOOWA");
			}
			
		});
	})	
}

setInterval(runLoop, 100);

c.series[0].data[0].update({color:randCol(c.series[0].data[0].color)});