(function(H) {
  const feedData = (chart, dataPoint, timestamp) => {
    if (chart.receiveData) {
      chart.data.push([
        parseFloat(timestamp),
        parseFloat(dataPoint) - chart.prev
      ]);
      chart.series[0].setData(chart.data.slice(2));
      chart.prev = dataPoint;
    }
  };
  const yieldData = () => {
    Highcharts.getJSON('http://api.open-notify.org/iss-now.json', (resp) => {
      feedData(leftChart, resp.iss_position.longitude, resp.timestamp);
      feedData(rightChart, resp.iss_position.latitude, resp.timestamp);
    });
  };
  const leftChart = H.stockChart('container1', {
    chart: {
      events: {
        load: function() {
          this.receiveData = true;
          this.data = [];
          this.prev = 0.0;
        }
      }
    },
    title: {
      text: 'LATITUDE'
    },
    stockTools: {
      gui: {
        enabled: true,
        buttons: [
          'toggleDataFeed',
          'avgDataGroup',
          'sumDataGroup',
          'indicators',
          'separator',
          'simpleShapes',
          'lines',
          'crookedLines',
          'measure',
          'advanced',
          'toggleAnnotations',
          'separator',
          'verticalLabels',
          'flags',
          'separator',
          'zoomChange',
          'fullScreen',
          'typeChange',
          'separator',
          'currentPriceIndicator',
          'saveChart',
        ],
        definitions: {
          toggleDataFeed: {
            className: 'highcharts-toggle-datafeed',
            symbol: 'oval.svg'
          },
          avgDataGroup: {
            className: 'highcharts-avg-datagroup',
            symbol: 'circle.svg'
          },
          sumDataGroup: {
            className: 'highcharts-sum-datagroup',
            symbol: 'circle.svg'
          }
        }
      }
    },
    navigation: {
      bindings: {
        toggleDataFeed: {
          className: 'highcharts-toggle-datafeed',
          init: function(e) {
            this.chart.receiveData = !this.chart.receiveData;
          }
        },
        avgDataGroup: {
          className: 'highcharts-avg-datagroup',
          init: function(e) {
            this.chart.series[0].update({
              dataGrouping: {
                enabled: true,
                approximations: 'sum'
              }
            });
          }
        },
        sumDataGroup: {
          className: 'highcharts-sum-datagroup',
          init: function(e) {
            this.chart.series[0].update({
              dataGrouping: {
                enabled: true,
                approximations: 'average'
              }
            });
          }
        },
      }
    },
    series: [{
      yAxis: 0,
      dataGrouping: {
        enabled: false,
      }
    }]
  });

  const rightChart = H.stockChart('container2', {
    chart: {
      events: {
        load: function() {
          this.receiveData = true;
          this.data = [];
          this.prev = 0.0;
        }
      }
    },
    stockTools: {
      gui: {
        enabled: true,
        buttons: [
          'toggleDataFeed',
          'indicators',
          'separator',
          'simpleShapes',
          'lines',
          'crookedLines',
          'measure',
          'advanced',
          'toggleAnnotations',
          'separator',
          'verticalLabels',
          'flags',
          'separator',
          'zoomChange',
          'fullScreen',
          'typeChange',
          'separator',
          'currentPriceIndicator',
          'saveChart',
        ],
        definitions: {
          toggleDataFeed: {
            className: 'highcharts-toggle-datafeed',
            symbol: 'oval.svg'
          }
        }
      }
    },
    navigation: {
      bindings: {
        toggleDataFeed: {
          className: 'highcharts-toggle-datafeed',
          init: function(e) {
            this.chart.receiveData = !this.chart.receiveData;
          }
        },
      },
    },
    title: {
      text: 'LONGITUDE'
    },
    yAxis: [{
        height: '33%',
      },
      {
        height: '33%',
        top: '33%',
      },
      {
        height: '33%',
        top: '66%',
      }
    ],
    plotOptions: {
      series: {
        dataGrouping: {
          enabled: true,
          groupAllPoints: true,
          groupPixelWidth: 100,
        }
      }
    },
    series: [{
        yAxis: 0,
        id: 'main-series',
        dataGrouping: {
          enabled: false,
        }
      },
      {
        yAxis: 1,
        type: 'sma',
        linkedTo: 'main-series',
        params: {
          period: 2
        },
        dataGrouping: {
          firstAnchor: 'start',
          lastAnchor: 'end'
        }
      },
      {
        type: 'macd',
        linkedTo: 'main-series',
        yAxis: 2,
        dataGrouping: {
          firstAnchor: 'start',
          lastAnchor: 'end'
        }
      }
    ]
  });
  setInterval(() => {
    yieldData();
  }, 2000);
}(Highcharts));