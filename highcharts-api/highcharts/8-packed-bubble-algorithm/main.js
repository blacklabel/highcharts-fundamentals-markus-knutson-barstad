
const buildColors = (exclude) => ['red','green','blue','yellow'].filter(c => c !== exclude);

const randCol = (exclude) => Array.from(buildColors(exclude))[Math.floor(Math.random() * 3)];

const getXlen = (p) => p.plotX + p.marker.width;
const getYlen = (p) => p.plotY + p.marker.height;

function intersectRect(r1, r2) {
  return !(r2.left > r1.right || 
           r2.right < r1.left || 
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
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
    	}
    ],
});


const runLoop = () => {
	c.series[0].data.forEach(mainP => {

		c.series[0].data.filter(p => p.value !== mainP.value).forEach(subP => {
			
			const x1Start = mainP.plotX;
			const x1End = getXlen(mainP);
			const y1Start = mainP.plotY;
			const y1End = getYlen(mainP);

			const r1 = {
				left: mainP.plotX + c.plotLeft,
				right: getXlen(mainP) + c.plotLeft,
				top: mainP.plotY + c.plotTop,
				bottom: getYlen(mainP) + c.plotTop,
			}

			const r2 = {
				left: subP.plotX + c.plotLeft,
				right: getXlen(subP) + c.plotLeft,
				top: subP.plotY + c.plotTop,
				bottom: getYlen(subP) + c.plotTop,
			}

			if(intersectRect(r1,r2)){
				console.log("awdawd");
			}

		});
	})	
}

setInterval(runLoop, 100);

c.series[0].data[0].update({color:randCol(c.series[0].data[0].color)});