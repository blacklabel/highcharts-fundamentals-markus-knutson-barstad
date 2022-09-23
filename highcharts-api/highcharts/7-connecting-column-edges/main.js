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

Highcharts.chart('container', {
  chart: {
    type: "column",

    events: {
      render() {
        const chart = this;

        if (chart.customLines) {
          chart.customLines.forEach(line => line.destroy());
        }

        chart.customLines = [];

        chart.series.forEach((series) => {

          if (series.visible) { //if a boolean in this array is set to true, we will draw paths for the series' cols
            series.data.forEach((dataPoint, dataIndex) => {

              if (dataIndex > 0) { //we start drawing from the second col back to the first one and so forth
                const previousPoint = series.data[dataIndex - 1];

                chart.customLines.push( //we push a path to the customLine-array
                  chart.renderer.path([
                    'M',
                    chart.plotLeft + dataPoint.shapeArgs.x, //left side of right col
                    chart.plotTop + dataPoint.shapeArgs.y,
                    'L',
                    chart.plotLeft + previousPoint.shapeArgs.x + previousPoint.shapeArgs.width, //right side of left col
                    chart.plotTop + previousPoint.shapeArgs.y
                  ])
                  .attr({
                    'stroke-width': 2,
                    stroke: series.color
                  })
                );
              }
            });
          }
        });

        chart.customLines.forEach(line => line.add().toFront());
      },
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
