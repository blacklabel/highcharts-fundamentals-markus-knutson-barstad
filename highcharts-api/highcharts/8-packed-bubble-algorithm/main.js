const randCol = () => Array.from(["red","green","blue","yellow"])[Math.floor(Math.random() * 3)];

Highcharts.chart('container1', {
    chart: {
        type: 'packedbubble',
        
        event: {
        }
    },
 
    plotOptions: {
    	packedbubble: {
     	   layoutAlgorithm: {
     	       splitSeries: true,
     	       dragBetweenSeries: true
     	   }
    	}
	},

	series: [
		{
        	data: [50, 12, 33, 84, 45, 60] // sizes of the bubble
    	},
    	{
        	data: [50, 12, 33] // sizes of the bubble
    	}
    ],
});


Highcharts.chart('container2', {
    chart: {
        type: 'packedbubble',
    	
        events: {
	    	render: function () {
	    		this.series[0].data.forEach(d => console.log(d));
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
     	   }
    	}
	},

	series: [
		{
        	data: [
        		{value: 50, color:"red"}, 
        		{value: 12, color:"blue"},
        		{value: 76, color:"green"},
        	],

        	point: {
        		events: {
        			update: function () {
        				console.log(this);
        			}
        		}
        	}
    	}
    ],
});


