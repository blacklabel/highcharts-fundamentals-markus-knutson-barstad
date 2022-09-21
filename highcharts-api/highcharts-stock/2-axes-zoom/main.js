const data = [-60,-40,-20,0,20,40,60]
const extremeAround = (axis, len, focal) => {
	axis.setExtremes(
		focal - Math.abs(axis.toValue(len)),
		focal + Math.abs(axis.toValue(len)),
	);
};

/*
	todo: flytt mouseover-detection til
		- label mouseover
		- yLine mouseover
*/

Highcharts.stockChart('container', {
	chart:{
		zooming:{
			type:"xy",
		},
		events:{
			load: function(){
				this.holdingClick = false; //whether user is holding mousebutton clicked
				this.yScale = 0; //space of the box the user dragged
				this.mouseLastYPos = null; //where the users drag originated
				this.minX = 0; //minimum-extreme for the xAxis

				window.addEventListener('mousedown',() => this.holdingClick = true);
				window.addEventListener('mouseup',() => this.holdingClick = false);
				window.addEventListener('mouseover',(e) => {
					if(this.holdingClick){
						if(this.mouseLastYPos === null){
							this.mouseLastYPos = e.y;
							this.yScale = 0;
						}else{
							this.yScale = e.y - this.mouseLastYPos;
						}
					}else{
						this.mouseLastYPos = null;
					}
				});

				window.addEventListener('wheel', (e) => {
					this.minX += e.deltaY * 0.01;
					this.minX = Math.max(this.minX, 0);
					this.xAxis[0].setExtremes(this.minX,null);
				});

			},
			selection: function(e){
				if(!e.resetSelection){
					extremeAround(this.yAxis[0],this.yScale + e.y,0);
				}else{
					this.yAxis[0].setExtremes(null,null);
				}
				console.log(this.yAxis[0].series[0].data[3].plotY);
			}
		}
	},
	title: {
		text: ''
	},
	xAxis:{
		minRange: 0.000001
	},
	yAxis:{
		events:{
			setExtremes:function(e){
				if(!e.trigger){
					this.update({
						min:e.min,
						max:e.max
					});
				}else{
					e.preventDefault();
				}
			}
		}
	},
	series: [{
		data: data,
	}]
});