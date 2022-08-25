/*
	idk how important it is to mimic the screenshot in terms of random values for the different series, 
	i tried to do so reasonably
*/

const dataMaker = (min, max) => {
  const arr = [];
  for (let i = 0; i < 6; i++) {
    arr.push(Math.floor(Math.random() * (max - min) + min));
  }
  return arr;
}

const drawForSeries = [true, true, true];

Highcharts.chart('container', {
  accessibility: {
    enabled: false
  },

  chart: {
    type: "column",

    events: {
      render() {
        const ren = this.renderer;

        if (this.customLines) {
          this.customLines.forEach(p => p.destroy());
        }

        this.customLines = [];

        this.series.forEach((s, i) => {

          if (drawForSeries[i]) { //if a boolean in this array is set to true, we will draw paths for the series' cols

            s.data.forEach((d, i) => {

              if (i > 0) { //we start drawing from the second col back to the first one and so forth

                this.customLines.push( //we push a path to the customLine-array
                  ren.path([
                    'M',
                    this.plotLeft + d.shapeArgs.x, //left side of right col
                    this.plotTop + d.shapeArgs.y,

                    'L',
                    this.plotLeft + s.data[i - 1].shapeArgs.x + s.data[i - 1].shapeArgs.width, //right side of left col
                    this.plotTop + s.data[i - 1].shapeArgs.y
                  ])
                  .attr({
                    'stroke-width': 2,
                    stroke: s.color
                  })
                );
              }
            });
          }
        });

        this.customLines.forEach(p => {
          p.add().toFront();
        });
      },
    }
  },

  plotOptions: {
    series: {
      events: {
        legendItemClick: function() {
          drawForSeries[this.index] = !drawForSeries[this.index];
        }
      }
    }
  },

  yAxis: {
    max: 16,
    tickInterval: 4
  },

  series: [{
    data: dataMaker(12, 16)
  }, {
    data: dataMaker(1, 12)
  }, {
    data: dataMaker(2, 7)
  }]
});
