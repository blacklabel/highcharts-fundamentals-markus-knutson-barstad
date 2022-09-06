const dataArr = [3, 4, 5, 3, 2, 3, 2, 3, 4, 5, 3, 6, 3, 2, 4, 5, 5, 6, 6, 1, 6, 6, 2, 1, 3, 5, 6];
const frequency = (nArr) => {
  const freq = Array.from(Array(7)).map(n => n = 0); //make array to hold frequency of all 6 values
  nArr.forEach(n => {
    freq[n]++;
  });
  return freq;
}

Highcharts.chart('container', {
  chart: {
    type: 'scatter'
  },
  title: {
    text: ''
  },
  legend: {
    enabled: false
  },
  xAxis: [{
    startOnTick: true,
    showLastLabel: true,
    tickInterval: 5,
    min: 0,
    max: 25
  }, {
    tickInterval: 1,
    showLastLabel: false,
    min: 1,
    max: 6,
    opposite: true
  }],
  yAxis: [{
      title: {
        text: ''
      },
      tickInterval: 3,
      max: 12,
      min: 0,
      endOnTick: false
    },
    {
      title: {
        text: ''
      },
      tickInterval: 2,
      max: 8,
      min: 0,
      opposite: true,
      endOnTick: false
    }
  ],

  plotOptions: {
    series: {
      allowPointSelect: true,
      states: {
        inactive: {
          enabled: false
        }
      }
    }
  },

  series: [{
    yAxis: 1,
    xAxis: 1,
    type: 'histogram',
    borderWidth: 0,
    data: frequency(dataArr),
    point: {
      events: {
        click: function() {
          this.series.chart.series[1].points.forEach(p => this.index === p.y ? p.setState('select') : p.setState('unselect'));
        }
      }
    }
  }, {
    yAxis: 0,
    xAxis: 0,
    color: '#000000',
    data: dataArr
  }]
});