const dataMaker = () => Array.from(Array(100)).map(()=>Math.floor(Math.random()* 100)); //build ints

Highcharts.chart('container',{
	accessibility: {
		enabled: false
	},

	chart: {
		type: 'line',
		zoomType: 'xy',
		panKey: 'meta',

		events: {
			selection: function () {

				console.log(this);

				let pCount = 0;

				this.series[0].data.forEach((p)=> {
					
				});

				console.log(pCount);

				// const ren = this.renderer;

				// if(this.displayPcount){
				// 	this.displayPcount.destroy();
				// }

				// this.displayPcount = ren.label(
				// 	"points on screen " + pCount,
				// 	this.plotBox.x,
				// 	this.spacingBox.height
				// );

				// this.displayPcount.add();

			}
		}
	},

	yAxis: {
		
	},

	xAxis: {

	},

	series: 
	[{
		data: dataMaker()
	}]
});