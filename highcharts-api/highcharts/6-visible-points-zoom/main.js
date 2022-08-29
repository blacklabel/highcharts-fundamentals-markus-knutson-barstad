const dataMaker = () => Array.from(Array(100)).map(() => Math.floor(Math.random() * 100));

const checkCoord = (n, min, max) => n >= min && n <= max;

const destroyArr = (arr) => arr.forEach(obj => obj.destroy());

const destroyObjects = (obj) => Array.isArray(obj) ? destroyArr(obj) : obj.destroy();

const clearScreen = (toClear) => toClear && destroyObjects(toClear);

Highcharts.chart('container', {
  chart: {
    type: 'line',
    zoomType: 'xy',
    events: {
      render: function() {
        const chart = this;
        const ren = chart.renderer;
        const xMin = chart.xAxis[0].min;
        const xMax = chart.xAxis[0].max;
        const yMin = chart.yAxis[0].min;
        const yMax = chart.yAxis[0].max;
        let pCount = 0;
        let highestPoints = [];

        clearScreen(chart.label);
        clearScreen(chart.highestLabels);
        clearScreen(chart.dots);

        chart.highestLabels = [];
        chart.dots = [];

        chart.series[0].data.forEach((p) => {
          if (checkCoord(p.x, xMin, xMax) && checkCoord(p.y, yMin, yMax)) {
            if (highestPoints[0] == null || p.y == highestPoints[0].y) {
              highestPoints.push(p);
            } else if (p.y > highestPoints[0].y) {
              highestPoints = [p];
            }
            pCount++;
          }
        });

        chart.label = ren.label('visible points: ' + pCount, chart.xAxis[0].pos, chart.spacingBox.height).add();

        highestPoints.forEach(p => {
          //building red labels
          chart.highestLabels.push(
            ren.label(
              p.y + '',
              p.plotX + chart.xAxis[0].left - 11,
              p.plotY + p.series.itemHeight
            )
            .attr({
              aligh: 'right'
            })
            .css({
              color: 'red'
            })
          );

          //building red dots
          chart.dots.push(
            ren.circle(
              p.plotX + chart.xAxis[0].left - 1,
              chart.xAxis[0].height + 53,
              4)
            .attr({
              align: 'right'
            })
            .css({
              color: 'red'
            })
          );
        });

        chart.highestLabels.forEach(l => l.add().toFront());
        chart.dots.forEach(d => d.add().toFront());
      }
    }
  },

  series: [{
    data: dataMaker()
  }]
});