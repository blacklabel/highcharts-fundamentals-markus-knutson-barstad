
/*
	TODO:
		splitSeries must be true to see the parentNode (i think)
		so we need more series

		then we need to check if there is an update function
		and find a parent-nodes x, y and radius

		maybe try to hide the original bubbles
*/

const buildColors = (exclude) => ['red','green','blue','yellow'].filter(c => c !== exclude);

const randCol = (exclude) => Array.from(buildColors(exclude))[Math.floor(Math.random() * 3)];

const squared = (n) => Math.pow(n,2);

const radiiDistance = (c1, c2) => Math.sqrt(squared(c1.x - c2.x) + squared(c1.y - c2.y));

const collides = (c1, c2) => (radiiDistance(c1,c2) < c1.r + c2.r);

const circleObj = (x, y, r) => {
	return {
		x:x,
		y:y,
		r:r,
	}
}

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
                    friction: -0.995, // some constants altered just for displaying and testing
                    gravitationalConstant:0.025,
                    bubblePadding: 0,
                    // parentNodeLimit:true,
                    // parentNodeOptions:{
                    // 	marker: {
                    // 		enabled:true,
                    // 		fillColor: "black",
                    // 		lineColor: "red",
                    // 		lineWidth: 10,
                    // 		radius:100,
                    // 	}
                    // }
                },
            }
        },

        /* 
        	i had a better time making the bubbles "notice eachother" when putting the larger values first,
        	but it seems like layoutAlgorithm-constants might be a if not the deciding factor
        */
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
