/*
	+-----------+
	| 			|
	|	PART 3	|
	|			|
	+-----------+

	First of all this might be quite a hacky solution. 
	It does not perfectly always trigger a color-change, and sometimes it triggers too many.
	My guess is that it is somewhat incorrect, but hopefully fun to read, it was fun to write! (^_^)

		Problems i ran in to in this part of the exercise (part 3):
			- I struggled with changing the parentNodeOptions.fillColor
			- IIRC I succesfully changed references to it within the charts JSON-tree, but it did not impact the rendered colors
			- I also wasn't able to figure out how to use the 'series.update({})'-method to change it
			- Thus I decided on changing colors via HTML-elements in the DOM, which was eazy peazy
			- I realize now in hindsight that maybe i should have explored higher level chart-functions like render/redraw
			- It could be that I was on the right track with the series.update({})-function but just messed something up! x)
			- during this exercise i also tried to use animation.step and also the webAPI 'mutationobserver' and learned a lot
			
		How it works:
			- The series are split using layoutAlgorithm's 'splitSeries' which gives a parent bubble, a parentNode, to every series
			- colors of bubbles and series have both been disabled, so that the only color we see are markers of parentNodes
			- during the initial load-animation, setInterval listens to collision between parent-bubbles
			- the collision-mesh, like in the last task, is a circular circumference,
			
			- the math for getting the circumference is as follows: 
				* We have 2 circles, each have an Xpos, Ypos, and radius
				* For a given circle we subtract each x and y from the others x and y
				* We square the result for each of these operations, then add those squared results together
				* if this sum is less than or equal to the sum of the radii from both circles we have a collision/intersection

			- when we have such an intersection we change the colors
			
			- There are bugs:
				* If 2 bubbles collide and the lower bubble is the largest, it will not always change its color.
				* I tried to sort the series-array according to members values
				* could it be that i need to check for what bubble is the biggest when i check their circumference?
			
			+-----------------------+
			|						|
			|	REGARDING PART 2	|
			|						|
			+-----------------------+
			- regarding part 2, math and functionality is much the same, only that: 
				* we get circle-data based on bubbles, not parent nodes,
				* we also loop through the datapoints of a single series, not multiple single-point-data series as in this file
				* we disable color for everything but bubble-points
				
				
			+-----------------------+
			|						|
			|	REGARDING PART 1	|
			|						|
			+-----------------------+
			- regarding part 1,
				* as i am finishing up this task during the weekend, i am not able to drag bubbles, but iirc it worked on my workstation in Vik
				* i am also not able to drag bubbles in this chart which specifically states that this is possible: 
					https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/series-packedbubble/packed-dashboard/
					
				* i think it could be the old laptop i am currently working on which is the issue, it is very old and kindof buggy x)
				* apologies if i have missed something!
				
				
 */
const buildColors = (exclude) => ['red', 'green', 'blue', 'yellow'].filter(c => c !== exclude);

const randCol = (exclude) => Array.from(buildColors(exclude))[Math.floor(Math.random() * 3)];

const squared = (n) => Math.pow(n, 2);

const radiiDistance = (c1, c2) => Math.sqrt(squared(c1.x - c2.x) + squared(c1.y - c2.y));

const collides = (c1, c2) => (radiiDistance(c1, c2) <= c1.r + c2.r);

const circleObj = (x, y, r) => {
  return {
    x: x,
    y: y,
    r: r,
  }
};

const circleFromSeries = (s) => {
  return circleObj(
    s.parentNode.plotX,
    s.parentNode.plotY + s.parentNode.radius,
    s.parentNode.radius
  )
};

const parentsTouching = (mainS, otherS) => collides(circleFromSeries(mainS), circleFromSeries(otherS));

const otherParents = (toFilter, parents) => parents.filter(s => s.index !== toFilter.index);

const algBuilder = (color) => {
  return {
    splitSeries: true,
    bubblePadding: -2,
    friction: -0.999,
    gravitationalConstant: 0.015,
    parentNodeOptions: {
      marker: {
        enabled: true,
        fillColor: randCol(),
        fillOpacity: 0.2,
        radius: 2
      }
    }
  }
}

const seriesBuilder = (n) => {

  const seriesArr = [];

  while (n--) {
    seriesArr.push({
      data: [{
        value: Math.random() * 150
      }],
      layoutAlgorithm: algBuilder(randCol())
    });
  }

  return seriesArr.sort((a, b) => b.data.value - a.data.value);
}

const c = Highcharts.chart('container', {
  chart: {
    type: 'packedbubble',
    margin: 0,
  },

  tooltip: {
    enabled: false
  },

  legend: {
    enabled: false,
  },

  plotOptions: {
    packedbubble: {
      color: 'transparent',
    }
  },

  series: seriesBuilder(3)
});

const parents = c.series;

const runLoop = () => {
  parents.forEach(mainSeries => {
    otherParents(mainSeries, parents).forEach(otherSeries => {

      if (parentsTouching(otherSeries, mainSeries)) {
        const parentMarker = otherSeries.parentNodeLayout.options.marker;
        parentMarker.fillColor = document.getElementsByTagName('path')[otherSeries.index].style.fill = randCol(parentMarker);
      }
    });
  });
}

setInterval(runLoop, 60);
