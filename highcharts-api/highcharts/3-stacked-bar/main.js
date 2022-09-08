class labelFactory {
  constructor(ren) {
    this.factoryRen = ren;
  };

  makeLabel(text, xPos, yPos, attr) {
    return this.factoryRen
      .label(text, xPos, yPos)
      .attr({...attr})
      .add()
      .toFront();
  }
  
  makeButton(text, xPos, yPos, attr) {
    return this.factoryRen
      .button(text, xPos, yPos)
      .attr({...attr})
      .add()
      .toFront();
  }

  destroyLabels (toDestroy) {
    Array.isArray(toDestroy) ? toDestroy.forEach(l => l.destroy()) : toDestroy.destroy();
  };

  destroyExisting(labels) {
    labels && this.destroyLabels(labels)
  };
}

Highcharts.chart('container', {
  title: {
    text: ''
  },

  chart: {
    type: 'bar',
	margin:70,
	
    events: {
      render: function() {
        const chart = this;
        const factory = new labelFactory(chart.renderer);

        //label positions
        const renderedRight = chart.yAxis[0].ticks[350].label.xy.x;
        const renderedRightOffset = chart.series[0].data[0].dataLabel.alignAttr.y - 2;

        factory.destroyExisting(chart.issueLabel);
        factory.destroyExisting(chart.actionLabel);
        factory.destroyExisting(chart.recordLabel);
        factory.destroyExisting(chart.fixLabels);

        chart.issueLabel = factory.makeLabel('Issue', 0, 0);
        chart.recordLabel = factory.makeLabel('Record Count', chart.yAxis[0].ticks[0].label.xy.x, 0);
        chart.actionLabel = factory.makeLabel('Action', renderedRight, 0);
        chart.fixLabels = [];

        Object.values(chart.xAxis[0].ticks).slice(0, -1).forEach((tick, index) => {
          chart.fixLabels.push(
            factory.makeButton(
              'How to fix',
              renderedRight,
              tick.label.xy.y - renderedRightOffset, {
                align: 'left',
                stroke: 'blue',
				fill:'white',
                'stroke-width': 3,
                padding: 12
              }
            )
          )
        });
      }
    }
  },

  xAxis: {
    labels: {
      align: 'right'
    },
    categories: ['data', 'emails', 'duplicates', 'support'],
    gridLineWidth: 1,
    lineWidth: 0,
  },

  yAxis: {
    tickPositions: [0, 50, 100, 150, 200, 250, 300, 350, 400],
    gridLineWidth: 0,
    title: {
      text: 'Amount'
    }
  },

  plotOptions: {
    series: {
      stacking: 'normal',
      showInLegend: false
    }
  },

  series: [{
      color: '#F9D949',
      data: [20, 0, 20, 10],
      dataLabels: {
        inside: false,
        enabled: true,
        format: '{total}K'
      }
    },
    {
      color: '#B99C45',
      data: [100, 120, 70, 50]
    },
    {
      color: '#95BA92',
      data: [85, 85, 45, 60]
    },
    {
      color: '#A77D82',
      data: [20, 0, 15, 10]
    }
  ],
});
