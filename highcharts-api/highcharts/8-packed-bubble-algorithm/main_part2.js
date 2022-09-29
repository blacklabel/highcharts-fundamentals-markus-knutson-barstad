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

const circleFromPoint = (p) => {
    return {
        x: (p.graphic.x + p.radius), //X1
        y: (p.graphic.y + p.radius * 2), //Y1
        r: p.radius //R1
    }
}

const bubblesTouching = (mainB, otherB) => collides(circleFromPoint(mainB), circleFromPoint(otherB));

const otherBubbles = (toFilter, bubbles) => bubbles.filter(b => b.value !== toFilter.value)

Highcharts.chart('container', {
  chart: {
    type: 'packedbubble',
    margin: 0,
    events:{
        load: function(){
            const chart = this;
            chart.bubbles = chart.series[0].data;

            setInterval(() => {
                chart.bubbles.forEach(mainB => {
                    otherBubbles(mainB, chart.bubbles).forEach(otherB => {
                      if (bubblesTouching(otherB, mainB)) {
                        otherB.update({
                          color: randCol(otherB.color)
                        });
                      }
                    });
                  });
                }, 144);
        }
    }
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
  }],
});
