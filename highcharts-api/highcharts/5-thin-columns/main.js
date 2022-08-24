const dataMaker = (n,min,max) => Array.from(Array(n)).map(()=> Math.random() * (max - min) + min);

Highcharts.chart('container', {
	accessibility: {
		enabled: false
	},

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
			data: dataMaker(300,60,90)
        }
   	},

	xAxis:[
		{
			left: '5%',
			width: '8%',
			
			labels: {
				enabled: false
			},
			
			title: {
				text: 'Bank 1'
			},

			minorTickLength: 0,
			tickLength: 0
		},
		{
			left: '25%',
			width: '8%',

			labels: {
				enabled: false
			},

			title: {
				text: 'Bank 2'
			},

			offset:0,
			minorTickLength: 0,
			tickLength: 0
		},
		{
			left: '45%',
			width: '8%',
			
			labels: {
				enabled: false
			},

			title: {
				text: 'Bank 3'
			},

			minorTickLength: 0,
			tickLength: 0,
			offset:0
		},
		{
			left: '65%',
			width: '8%',
			
			labels: {
				enabled: false,
			},

			title: {
				text: 'Bank 4'
			},

			offset:0,
			minorTickLength: 0,
			tickLength: 0
		},
		{
			left: '85%',
			width: '8%',
			
			labels: {
				enabled: false
			},

			title: {
				text: 'Bank 5'
			},
			
			offset:0,
			minorTickLength: 0,
			tickLength: 0
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
			xAxis: 0
		},
		{
			xAxis: 1
		},
		{
			xAxis: 2
		},
		{
			xAxis: 3
		},
		{
			xAxis: 4
		}
	]
	
})