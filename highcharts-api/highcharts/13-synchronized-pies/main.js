const commonData = [{
    name: 'space-ninjas',
    y: 60
  },
  {
    name: 'bananas',
    y: 25
  },
  {
    name: 'trollfaces',
    y: 15
  },
];

const c = Highcharts.chart('container', {
  chart: {
    type: 'pie',
    title: {
      text: ''
    }
  },
  plotOptions: {
    pie: {
      events: {
        mouseOver: function() {
          console.log('AWDAWD');
        }
      }
    }
  },

  series: [{
      center: ['25%'],
      data: commonData,
      showInLegend: true,
      point: {
        events: {
          legendItemClick: function(e) {
            this.series.chart.series[1].data.forEach(d => {
              if (d.name === this.name) {
                d.update({
                  visible: (d.visible === false ? true : false)
                })
              }
            });
          },
          mouseOver: function(e) {
            this.series.chart.series[1].data.forEach(d => {
              d.name === this.name ? d.setState('hover') : d.setState('inactive');
            });
          },
        }
      }
    },
    {
      center: ['75%'],
      data: commonData
    }
  ]
});

c.legend.allItems.forEach(l => { //trying to make legend behave uniformily

  l.legendItem.element.addEventListener('mouseover', () => {
    c.series.forEach(ser => {
      ser.points.forEach(d => {
        d.name === l.name ? d.setState('hover') : d.setState('inactive');
      })
    });
  })

  l.legendItem.element.addEventListener('mouseout', () => {
    c.series.forEach(ser => {
      ser.points.forEach(d => {
        d.setState('normal');
      })
    });
  });
});