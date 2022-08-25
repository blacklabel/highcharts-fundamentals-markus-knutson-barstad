Highcharts.chart('container', {
	chart: {
		type: "column",
		events: {
			render: function () {
				const ren = this.renderer;
				
				//venstre side av et datapoint
				var cXleft = this.plotLeft + this.series[0].data[0].shapeArgs.x; 

				//høyre side av et datapoint
				var cXright = this.plotLeft + this.series[0].data[0].shapeArgs.x + this.series[0].data[0].shapeArgs.width; 
				
				//nederste hjørne av et datapoint
				var cYdown = this.plotTop + this.series[0].data[0].shapeArgs.y + this.series[0].data[0].shapeArgs.height; 
				
				var cYup = this.plotTop + this.series[0].data[0].shapeArgs.y; 

				console.log(this.series[0].data[0]);
				ren.path([
					'M',
					cXleft,
					cYup,

					'L',
					cXleft,
					cYdown,
				])
				.attr({
					"stroke-width":5,
					stroke:"red"
				})
				.add();
				ren.path([
					'M',
					cXright,
					cYup,

					'L',
					cXright,
					cYdown,
				])
				.attr({
					"stroke-width":5,
					stroke:"red"
				})
				.add();
			}
		}
	}, 

	yAxis: {
		max:20
	},

	series: [{
		data: [12] 
	}] 
}); 
