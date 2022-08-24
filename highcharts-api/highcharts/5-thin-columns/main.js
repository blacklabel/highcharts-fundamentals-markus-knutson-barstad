const dataMaker = (n,min,max) => {
	d = [];

	for(let i = 0; i < n; i++){
		d.push(Math.random() * (max - min) + min);
	}

	return d;
}

Highcharts.chart('container', {
	chart: {
		type: 'column'
	},

	title: {
		text: ''
	},

	legend: {
		enabled: false
	},

	plotOptions: {
        series: {
			boostThreshold: 1,
			color: 'red',
			data: dataMaker(300,60,90),
        },
   	},

	xAxis:[
		{
			left: "5%",
			width: "10%",
			
			labels: {
				enabled: false
			},
			
			minorTickLength: 0,
			tickLength: 0,

			title: {
				text: 'Bank 1'
			}
		},
		{
			left: "25%",
			width: "10%",

			minorTickLength: 0,
			tickLength: 0,
			labels: {
				enabled: false
			},

			title: {
				text: 'Bank 2'
			},
			offset:0
		},
		{
			left: "45%",
			width: "10%",
			
			minorTickLength: 0,
			tickLength: 0,
			labels: {
				enabled: false
			},

			title: {
				text: 'Bank 3'
			},
			offset:0
		},
		{
			left: "65%",
			width: "10%",
			
			minorTickLength: 0,
			tickLength: 0,
			labels: {
				enabled: false,
			},

			title: {
				text: 'Bank 4'
			},
			offset:0
		},
		{
			left: "85%",
			width: "10%",
			
			minorTickLength: 0,
			tickLength: 0,
			labels: {
				enabled: false
			},

			title: {
				text: 'Bank 5'
			},
			offset:0
		}
	],

	yAxis:
		{
			max: 125,
			min: 0,
			tickInterval: 25
		},

	series: [
		{
			xAxis: 0,
		},
		{
			xAxis: 1,
		},
		{
			xAxis: 2,
		},
		{
			xAxis: 3,
		},
		{
			xAxis: 4,
		}
	]
	
})