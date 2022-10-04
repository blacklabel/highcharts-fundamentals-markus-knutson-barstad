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
  }];

Highcharts.wrap(Highcharts.Tooltip.prototype, 'hide', function(p, delay) {
  if (this === this.chart.tooltip) {
    p.call(this, delay);
    p.call(this.chart.customTooltip, delay);
  }
})

const c = Highcharts.chart('container', {
  chart: {
    type: 'pie',
    title: {
      text: ''
    },
    events: {
      load() {
        const chart = this;
        chart.customTooltip = new Highcharts.Tooltip(chart, Highcharts.merge(chart.options.tooltip));
        chart.manualHover = (series, pointName) => {
          series.points.forEach(p => {
            if(p.name === pointName){
              p.setState('hover');
              chart.customTooltip.refresh(p);
            }else{
              p.setState('inactive');
            }
          });
        };
      }
    }
  },
  series: [{
      center: ['25%'],
      data: commonData,
      showInLegend: true,
      point: {
        events: {
          legendItemClick(e){
            this.series.chart.series[1].data.forEach(d => {
              if (d.name === this.name) {
                d.update({
                  visible: (d.visible === false ? true : false)
                })
              }
            });
          },
          mouseOver(e){
            this.series.chart.manualHover(this.series.chart.series[1],this.name);
          }
        }
      }
    },
    {
      center: ['75%'],
      data: commonData,
      point: {
        events: {
          mouseOver(e) {
            this.series.chart.manualHover(this.series.chart.series[0],this.name);
          }
        }
      }

    }
  ]
});

c.legend.allItems.forEach(l => {
  l.legendItem.element.addEventListener('mouseover', () => {
      c.series[1].points.forEach(d => d.name === l.name ? d.setState('hover') : d.setState('inactive'));
  });
  l.legendItem.element.addEventListener('mouseout', () => {
      c.series[1].points.forEach(d => d.setState('normal'));
  });
});
