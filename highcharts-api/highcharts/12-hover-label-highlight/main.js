Highcharts.chart('container', {
  chart: {
    type: 'column',
    events: {
      load: function() {
        this.highlightedCategory = '';
      }
    }
  },
  title: {
    text: ''
  },
  plotOptions: {
    series: {
      point: {
        events: {
          mouseOver: function(e) {
            this.series.chart.highlightedCategory = this.category;
            this.series.chart.redraw(false);
          },
          mouseOut: function(e) {
            this.series.chart.highlightedCategory = '';
            this.series.chart.redraw(false);
          }
        }
      }
    }
  },
  xAxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Okt',
      'Nov',
      'Dec'
    ],
    labels: {
      enabled: true,
      formatter: function() {
        return this.value === this.chart.highlightedCategory ?
          '<span style="color: #EE4B2B;font-weight:bolder;">' + this.value + '</span>' :
          this.value;
      }
    }
  },

  yAxis: {
    max:250,
    title: {
      text: ''
    }
  },

  series: [{
    name: 'Tokyo',
    data: [130.93, 130.63, 130.73, 130.67, 140.37, 140.89, 140.56,
      140.32, 140.13, 130.93, 130.21, 120.16
    ]
  }, {
    name: 'New York',
    data: [120.24, 120.24, 110.95, 120.02, 110.65, 110.96, 110.59,
      110.94, 110.96, 110.59, 110.42, 110.76
    ]
  }, {
    name: 'London',
    data: [100.00, 90.93, 90.97, 100.01, 100.23, 100.26, 100.00,
      90.12, 90.36, 80.72, 80.38, 80.69
    ]
  }, {
    name: 'Berlin',
    data: [40.35, 40.32, 40.34, 40.39, 40.46, 40.52, 40.58, 40.55,
      40.53, 40.51, 40.49, 40.57
    ]
  }]
});