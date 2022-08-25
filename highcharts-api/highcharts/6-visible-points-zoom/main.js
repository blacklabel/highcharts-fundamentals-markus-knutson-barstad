const dataMaker = () => Array.from(Array(100)).map(()=>Math.floor(Math.random()* 100)); //build ints
const checkCoord = (n,min,max) => n >= min && n <= max;


Highcharts.chart('container',{
	accessibility: {
		enabled: false
	},

	chart: {
		type: 'line',
		zoomType: 'xy',
		panKey: 'meta',

		events: {
			render: function () {
				const ren  = this.renderer;
				const xMin = this.xAxis[0].min;
				const xMax = this.xAxis[0].max;
				const yMin = this.yAxis[0].min;
				const yMax = this.yAxis[0].max;	
				let pCount = 0;
				let highest;

				
				if(this.label){
					this.label.destroy();
				}

				if(this.highestLabel){
					this.highestLabel.destroy();
				}

				this.series[0].data.forEach((p)=> {
					if(checkCoord(p.x,xMin,xMax) && checkCoord(p.y, yMin, yMax)){
						if(highest == null || p.y > highest.y){
							highest = p;
							
						}		
						pCount++;
					}
				});

				console.log(highest);

				this.label = ren.label("visible points: " + pCount, this.xAxis[0].pos, this.spacingBox.height).add();
				
				console.log(this.xAxis[0]);
				this.highestLabel = ren.label(
					highest.y + "", 
					highest.plotX + this.xAxis[0].left - 11,
					highest.plotY + this.yAxis[0].top - 26)
				.attr({aligh:"center"})
				.css({color:"red"})
				.add();

				this.dot = ren.circle(highest.plotX + this.xAxis[0].left,this.xAxis[0].height + 47,4).attr({align:"center"}).css({color:"red"}).add().toFront();
			}
		}
	},

	series: 
	[{
		data: dataMaker()
	}]
});