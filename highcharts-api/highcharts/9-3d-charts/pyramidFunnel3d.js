
const sharedData = [[15654],[4064],[1987],[976],[846]];

Highcharts.chart('container', {
    chart: {
        
        options3d: {
            enabled: true,
            alpha: 8,
            depth: 128,
            viewDistance: 48
        }
    },
    title: {
        text: ''
    },
	

    plotOptions: {
        funnel3d: {
           center: ["50%", "70%"],
           height:"40%",
		   width:"40%",
        },
		pyramid3d: {
           center: ["50%", "30%"],
           height:"50%",
		    width:"50%",
        }
    },
	
    series: [
		{	
			type: 'pyramid3d',
			data: sharedData
		},
		{	
			type: 'funnel3d',
			data: sharedData,
		}
	]
});