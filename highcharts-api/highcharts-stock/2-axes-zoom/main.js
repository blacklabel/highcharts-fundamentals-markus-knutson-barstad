Highcharts.stockChart('container', {
	chart:{
		animation:false,
		events:{
			load: function(){
				//vars
				const chart = this;
				chart.xMin = 0;
				chart.xClicked =  false; //was the xAxis clicked?
				chart.yClicked = false; //was the yAxis clicked?
				chart.dragOrigin = null;

				//Event-listeners
				window.addEventListener('mousedown',(e) => {
					chart.yClicked = true;
					chart.dragOrigin = {x:e.x, y:e.y};
				});

				window.addEventListener('mouseup',() => {
					chart.xClicked = chart.yClicked = false;
					chart.dragOrigin = null;
				});
				
				window.addEventListener('mousemove', (e) => {
					if(chart.yClicked === true){
						const old = chart.yAxis[0].getExtremes();
						const newExtremeOffset = chart.yAxis[0].toValue(chart.dragOrigin.y - e.y) * 0.06;
						chart.yAxis[0].setExtremes(old.min - newExtremeOffset, old.max + newExtremeOffset);
					}
				});
				
				window.addEventListener('wheel', (e) => {
					chart.xMin += e.deltaY * 0.01;
					chart.xMin = Math.max(chart.xMin, 0);
					chart.xAxis[0].setExtremes(chart.xMin,null);
				});

				chart.series[0].setData([-6000,-4000,-2000,0,2000,4000,6000]);
			},
		}
	},
	title: {
		text: ''
	},
	xAxis:{
		minRange: 0.000001
	},
	yAxis:{
		minRange: 0.000001,
		startOnTick:false,
		endOnTick: false,

		events:{
			setExtremes:function(e){
				this.update({
					min:e.min,
					max:e.max
				});
			}
		}
	},
	series: [{
		data: null,
	}]
});