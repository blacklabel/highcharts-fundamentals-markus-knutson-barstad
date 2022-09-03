const dataMaker = (n, min, max) => Array.from(Array(n)).map(() => Math.random() * (max - min) + min);
const buildSeries = (n) => {
  const series = [];
  while (n--) {
    series.push({
      data: dataMaker(10, 5, 60)
    })
  }
  return series;
}

Highcharts.chart('container', {
  chart: {
    type: 'packedbubble',
  },

  plotOptions: {
    packedbubble: {
      layoutAlgorithm: {
        splitSeries: true,
        dragBetweenSeries: true
      }
    }
  },

  series: buildSeries(2)
});
