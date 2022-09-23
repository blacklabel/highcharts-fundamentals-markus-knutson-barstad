/*remove and regenerate plotband whenever setting new extremes*/

Highcharts.stockChart('container', {
	chart:{
		events:{
			load: function(){
				this.holdingClick = false; //whether user is holding mousebutton clicked
				this.minX = 0; //minimum-extreme for the xAxis
				this.yScaleAccelerator = 0.0002;
								
				window.addEventListener('mousedown',() => {
					console.log("CLICKD");
					this.holdingClick = true;
				});
								
				window.addEventListener('mouseup',() => {
					console.log("RELEASD");
					this.holdingClick = false;
				});

				window.addEventListener('mousemove', (e) => {				
					const old = this.yAxis[0].getExtremes();

					if(this.holdingClick === true){
						const newExtremeOffset = this.yAxis[0].toValue(e.y)*this.yScaleAccelerator / 10;
						this.yAxis[0].setExtremes(old.min - newExtremeOffset, old.max + newExtremeOffset);
						this.yScaleAccelerator = Math.max(this.yScaleAccelerator + 0.0002,1);
					}else{
						this.yScaleAccelerator = 0.00002;
					}
				})

				window.addEventListener('wheel', (e) => {
					this.minX += e.deltaY * 0.01;
					this.minX = Math.max(this.minX, 0);
					this.xAxis[0].setExtremes(this.minX,null);
				});
				this.series[0].setData([-6000,-4000,-2000,0,2000,4000,6000]);
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
			color:"transparent",
			
			// events:{
			// 	mousemove: function(e){
			// 		const axis = this.axis;
			// 		const old = axis.getExtremes();

			// 		if(axis.chart.holdingClick === true){
			// 			axis.setExtremes(old.min - axis.toValue(e.y), old.max + axis.toValue(e.y));
			// 		}
			// 	}
			// }
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
		data: null,
	}]
});