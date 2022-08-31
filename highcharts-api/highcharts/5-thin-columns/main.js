const dataMaker = (n, min, max) => Array.from(Array(n)).map(() => Math.random() * (max - min) + min);

const getBank = (i) => {
  return {
    left: String(5 + (i * 20)) + '%',
    width: '8%',
    offset: 0,
    labels: {
      enabled: false
    },
    title: {
      text: 'Bank ' + (i + 1)
    },
    tickLength: 0
  }
}

const buildBanks = (n) => {
  const banks = [];
  for (let i = 0; i < n; i++) {
    banks.push(getBank(i));
  }
  return banks
};

const buildSeriesArr = (n) => {
  series = [];
  for (let i = 0; i < n; i++) {
    series.push({
      xAxis: i
    });
  }
  return series;
}

Highcharts.chart('container', {
  chart: {
    type: 'column'
  },
  title: {
    text: ''
  },
  legend: {
    enabled: false
  },
  plotOptions: {
    series: {
      color: '#ff0000',
      data: dataMaker(300, 60, 90)
    }
  },
  xAxis: buildBanks(5),
  yAxis: {
    max: 125
  },
  series: buildSeriesArr(5)
});
