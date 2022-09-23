const data = [-60,-40,-20,0,20,40,60]
/*
	we want one general function which accomidates the yaxis; 
		- setting extremes around focal point
		- creating a new plotBand with appropriate event
*/

Highcharts.stockChart('container', {
	chart:{
		events:{
			load: function(){
				this.holdingClick = false; //whether user is holding mousebutton clicked
				this.mouseLastYPos = null; //where the users drag originated
				this.minX = 0; //minimum-extreme for the xAxis

				this.yAxis[0].plotLinesAndBands[0].svgElem.element.addEventListener('mousedown',() => this.holdingClick = true);
				this.yAxis[0].plotLinesAndBands[0].svgElem.element.addEventListener('mouseup',() => this.holdingClick = false);

				window.addEventListener('wheel', (e) => {
					this.minX += e.deltaY * 0.01;
					this.minX = Math.max(this.minX, 0);
					this.xAxis[0].setExtremes(this.minX,null);
				});
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
		plotBands:[{
			from: -100000,
			to: 100000,
			color:"lightblue",
			
			events:{
				mouseover: function(e){
					const axis = this.axis;
					const old = axis.getExtremes();
					const ratio = Math.abs(axis.toValue(e.y));
					if(axis.chart.mouseLastYPos === null){
						console.log("AWDWD");
						axis.chart.mouseLastYPos = e.y;
					}
					if (axis.chart.mouseLastYPos - e.y > 0){
						axis.setExtremes(old.min - ratio, old.max + ratio);
					
					}else if(axis.chart.mouseLastYPos - e.y < 0){
						axis.setExtremes(old.min + ratio, old.max - ratio);
					}
					axis.chart.mouseLastYPos = e.y;
			
				}
			}
		}],
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
		data: data,
	}]
});