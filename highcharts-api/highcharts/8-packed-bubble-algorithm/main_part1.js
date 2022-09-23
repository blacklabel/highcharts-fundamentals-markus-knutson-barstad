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
    events:{
      load:function(){
        const chart = this;
        setInterval(()=>{
          chart.series[1].points[5].update({series:chart.series[0]});
        }, 1000);
      }
    }
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