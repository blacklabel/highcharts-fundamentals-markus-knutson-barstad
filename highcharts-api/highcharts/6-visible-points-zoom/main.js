const dataMaker = () => Array.from(Array(100)).map(()=>Math.floor(Math.random()* 100)); //build ints
const checkCoord = (n,min,max) => n >= min && n <= max;
const clearScreen = (toClean) => {
	if(toClean){
		Array.from(toClean).forEach(c => c.destroy());
	}
}
Highcharts.chart('container',{

	chart: {
		type: 'line',
		zoomType: 'xy',

		events: {
			render: function () {
				const chart = this;

				const ren  = chart.renderer;
				const xMin = chart.xAxis[0].min;
				const xMax = chart.xAxis[0].max;
				const yMin = chart.yAxis[0].min;
				const yMax = chart.yAxis[0].max;	
				let pCount = 0;
				let highestPoints = [];

				clearScreen(chart.label);
				clearScreen(chart.highestLabels);
				clearScreen(chart.dots);

				chart.highestLabels = [];
				chart.dots = [];

				chart.series[0].data.forEach((p)=> {
					if(checkCoord(p.x,xMin,xMax) && checkCoord(p.y, yMin, yMax)){

						console.log(p);

						if(highestPoints[0] == null || p.y == highestPoints[0].y){
							highestPoints.push(p);
						}else if(p.y > highestPoints[0].y)
						{
							highestPoints = [p];
						}
						pCount++;
					}
				});
		
				chart.label = ren.label('visible points: ' + pCount, chart.xAxis[0].pos, chart.spacingBox.height).add();
				
				//use the index of the point to get the position of the corresponding tick-label
				//do it for y as well, the right y-tick line and a proper offset
				highestPoints.forEach(p => {

					chart.highestLabels.push(ren.label(
						p.y + '', 
						p.plotX + chart.xAxis[0].left - 11,
						p.plotY + p.series.itemHeight
					)
					.attr({aligh:'right'})
					.css({color:'red'}));

					chart.dots.push(ren.circle(p.plotX + chart.xAxis[0].left,chart.xAxis[0].height + 52,4).attr({align:'center'}).css({color:'red'}));
				});
				
				chart.highestLabels.forEach(l => l.add());
				chart.dots.forEach(d => d.add().toFront());
			}
		}
	},

	series: 
	[{
		data: dataMaker()
	}]
});
