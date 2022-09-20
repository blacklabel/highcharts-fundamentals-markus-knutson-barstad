const data = [0,20,40,60,80,100,120];
//const focal = 60;
//console.log(this.yAxis[0],this.yAxis[0].series[0].data[3].plotY);
const extremeAround = (axis, len, focal) => {
	axis.setExtremes(
		focal - axis.toValue(len),
		focal + axis.toValue(len),
	);
};

let holdingClick = false; //whether user clicked
//let yDir = 0;
let yDimension = 0;
let lastYPos = null;

window.addEventListener('mousedown',() => holdingClick = true);
window.addEventListener('mouseup',() => holdingClick = false);
window.addEventListener('mouseover',(e) => {
	if(holdingClick){
		if(lastYPos === null){
			lastYPos = e.y;
			//yDir = 0;
			yDimension = 0;
		}else{
			yDimension = lastYPos - e.y;
		}
		/*
		}else if(lastYPos - e.y > 0){
			yDir =  1;
		}else if(lastYPos - e.y < 0){
			yDir =  -1;
		}else{
			yDir = 0;
		}*/
	}else{
		lastYPos = null;
	}
});

Highcharts.stockChart('container', {
	chart:{
		zooming:{
			type:"xy",
		},
		events:{
			load: function(){
				extremeAround(this.yAxis[0],this.yAxis[0].series[0].data[6].plotY,60);
			},
			selection: function(e){
				if(!e.resetSelection){
					extremeAround(this.yAxis[0],e.y,60);
				}
			}
		}
	},
	title: {
		text: ''
	},
	yAxis:{
		startOnTick:false,
		endOnTick:false,
		events:{
			setExtremes:function(e){
				if(!e.trigger){
					this.update({min:e.min,max:e.max});
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