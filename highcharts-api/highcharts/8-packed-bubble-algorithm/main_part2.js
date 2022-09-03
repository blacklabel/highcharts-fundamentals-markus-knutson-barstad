const buildColors = (exclude) => ['red', 'green', 'blue', 'yellow'].filter(c => c !== exclude);

const randCol = (exclude) => Array.from(buildColors(exclude))[Math.floor(Math.random() * 3)];

const squared = (n) => Math.pow(n, 2);

const radiiDistance = (c1, c2) => Math.sqrt(squared(c1.x - c2.x) + squared(c1.y - c2.y));

const collides = (c1, c2) => (radiiDistance(c1, c2) <= c1.r + c2.r);

const buildRandData = (n) => {

  const data = [];
  while (n--) {
    data.push({
      value: Math.random() * 150,
      color: randCol()
    })
  }

  return data.sort((a, b) => b.value - a.value);
};

const circleObj = (x, y, r) => {
  return {
    x: x,
    y: y,
    r: r,
  }
};

const circleFromPoint = (p) => {
  return circleObj(
    p.graphic.x + p.radius, //X1
    p.graphic.y + p.radius * 2, //Y1
    p.radius //R1
  );
}

const bubblesTouching = (mainB, otherB) => collides(circleFromPoint(mainB), circleFromPoint(otherB));

const otherBubbles = (toFilter, bubbles) => bubbles.filter(b => b.value !== toFilter.value)

const c = Highcharts.chart('container', {
  chart: {
    type: 'packedbubble',
    margin: 0
  },

  tooltip: {
    enabled: false
  },

  legend: {
    enabled: false,
  },

  plotOptions: {
    packedbubble: {
      layoutAlgorithm: {
        splitSeries: false,
        friction: -0.995,
        gravitationalConstant: 0.025,
        bubblePadding: 0,
      },
    }
  },

  series: [{
    data: buildRandData(3),

    point: {
      events: {
        update: event => {
          this.color = event.options;
        }
      }
    },
  }],
});

const bubbles = c.series[0].data;

const runLoop = () => {

  bubbles.forEach(mainB => {

    otherBubbles(mainB, bubbles).forEach(otherB => {

      if (bubblesTouching(otherB, mainB)) {
        otherB.update({
          color: randCol(otherB.color)
        });
      }
    });
  });
}

setInterval(runLoop, 144);
