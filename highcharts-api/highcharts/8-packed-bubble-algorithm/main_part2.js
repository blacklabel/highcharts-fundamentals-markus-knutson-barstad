import { buildColors, randCol, squared, radiiDistance, collides, circleObj } from "./colorBubbleFactory.js";

const circleFromPoint = (p) => {
	return circleObj(
			p.graphic.x + p.radius,		//X1
			p.graphic.y + p.radius * 2,	//Y1
			p.radius					//R1
		);
}

const bubblesTouching = (mainB, otherB) => collides(circleFromPoint(mainB),circleFromPoint(otherB));

const otherBubbles = (toFilter, bubbles) => bubbles.filter(b => b.value !== toFilter.value)

const c = Highcharts.chart('container2', {
        chart: {
	        type: 'packedbubble',
	        margin:0,
	        events: {
	        	render: function(){
	        		this.series[0].data.forEach(p => {
	        			console.log(p);
	        		})
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
                    friction: -0.995,
                    gravitationalConstant:0.025,
                    bubblePadding: 0,
                },
            }
        },

        series: [{
            data: [
                {value: 150, color:'red'},
                {value: 105, color:'green'},
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

const bubbles = c.series[0].data;

const runLoop = () => {
    bubbles.forEach(mainB => {
        otherBubbles(mainB,bubbles).forEach(otherB => {
        	if(bubblesTouching(otherB,mainB)){        		
        		otherB.update({
        			color:randCol(otherB.color)
        		});
        	}
        });
    });
}

setInterval(runLoop, 144);
