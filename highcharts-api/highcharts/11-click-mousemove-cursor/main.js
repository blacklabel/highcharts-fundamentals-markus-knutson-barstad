let clicked = false;
let mouseIn = false;
let mX = 0;
let mY = 0;
//let finalX = 0;
//let finalY = 0;
//convert clientX to plotX to make responsive



const clickGeneratedCircles = []
const buildCircle = (ren, x,y,r) => ren.circle(x,y,r).attr({fill:"blue"});

//when clicked, add circleFollower to arr

const c = 
Highcharts.chart('container', {
	
	chart: {
		events: {
				render: function(){
					const chart = this;
					const ren = chart.renderer;
					
					if(chart.toRender){
						chart.toRender.forEach(elem => elem.destroy());
					}
					
					chart.toRender = [];
					
					if(mouseIn){
						chart.toRender.push(buildCircle(ren,mX,mY,20)); //also add this to a "toRender" array
					}
					
					chart.toRender.forEach(elem => elem.add().toFront());
					//if clicked, add circleFollower to clickedGeneratedCircles
				}
		}
		
	},
	
	legend: {
		enabled:false
	},

    yAxis: {
        title: {
            text: ''
        }
    },

    series: [{
		events: {
			mouseOver: function(){
				mouseIn = true;
			},
			mouseOut: function(){
				mouseIn = false;
			},
			click: function () {
				clicked = true;
			}
		},
        data: [43, 486, 651, 27, 11, 233,
            173, 165, 17, 64, 150]
    }]

});

document.addEventListener('mousemove', followMouse);

function followMouse(e) {
	mX = e.clientX;
	mY = e.clientY;
	c.redraw();
}