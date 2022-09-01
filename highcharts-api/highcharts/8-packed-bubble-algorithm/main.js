const debugPoint = (point) => {
	console.log("!~![DEBUG POINT]!~!");
	
	console.log(point.plotX);
	console.log(point.plotY);
	console.log("######");

	console.log("plotX: " + point.plotX);
	console.log("plotY " + point.plotY);
	console.log("######");
	
	console.log(point);
	console.log("+---------------------------------------+\n");
};

const debugAllPoints = () => c.series[0].data.forEach(p => debugPoint(p));

/*================================================*/

const buildColors = (exclude) => ['red','green','blue','yellow'].filter(c => c !== exclude);

const randCol = (exclude) => Array.from(buildColors(exclude))[Math.floor(Math.random() * 3)];

const within = (r1,r2) => !(r1.start < r2.end && r2.start > r1.end);


// math-stuff https://www.geeksforgeeks.org/check-two-given-circles-touch-intersect/
const squared = (n) => Math.pow(n,2);

const distance = (c1, c2) => Math.sqrt(squared(c1.x - c2.x) + squared(c1.y, c2.y));

const overlaps = (c1, c2) => (distance(c1,c2) < c1.r + c2.r);

const circleObj = (x, y, r) => {
	return {
		x:x,
		y:y,
		r:r,
	}
}

const c = Highcharts.chart('container2', {
        chart: {
	        type: 'packedbubble',
	        margin:0,
	        spacing:0,

	        events: {
	        	renderer: {

	        	}
	        }
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
                },

          		animation: false
            }
        },
        series: [{
            animation: false,
            data: [
                {value: 50, color:'red'},
                {value: 12, color:'blue'},
                ],

            point: {
                events: {
                    update: event => {
                            this.color = event.options;
                        }
                }
            },
        }],
});

const runLoop = () => {
        c.series[0].data.forEach(mainP => {
						const mainC = circleObj(
							mainP.plotX + c.plotLeft,	//X1
							mainP.plotY + c.plotTop,	//Y1
							mainP.radius				//R1
						);

                c.series[0].data.filter(p => p.value !== mainP.value).forEach(subP => {
                    	const subC = circleObj(
							suP.plotX + c.plotLeft,		//X2
							suP.plotY + c.plotTop,		//Y2
                    		subP.radius					//R2
                    	);
                    	
                    	if(overlaps(mainC,subC)){
                    		mainP.update({
                    			color:randCol(mainP.color)
                    		});
                    	}
                });
        });
}

setInterval(debugAllPoints, 1000);