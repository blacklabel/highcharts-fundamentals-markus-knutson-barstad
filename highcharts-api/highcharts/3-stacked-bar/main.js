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
    marginTop: 50,

    events: {
      render: function() {
        const chart = this;
        const factory = new labelFactory(chart.renderer);

        //label positions
        const labelRight = chart.yAxis[0].ticks[350].label.xy['x'];
        const labelTop = 20;
        const labelRightOffset = chart.series[0].data[0].dataLabel.alignAttr.y - 2;

        factory.destroyExisting(chart.issueLabel);
        factory.destroyExisting(chart.actionLabel);
        factory.destroyExisting(chart.recordLabel);
        factory.destroyExisting(chart.fixLabels);

        chart.issueLabel = factory.makeLabel('Issue', 0, labelTop).add().toFront();
        chart.recordLabel = factory.makeLabel('Record Count', chart.yAxis[0].ticks[0].label.xy['x'], labelTop).add().toFront();
        chart.actionLabel = factory.makeLabel('Action', labelRight, labelTop).add().toFront();
        chart.fixLabels = [];

        Object.values(chart.xAxis[0].ticks).slice(0, -1).forEach((tick, index) => {
          chart.fixLabels.push(
            factory.makeLabel(
              'How to fix',
              labelRight,
              tick.label.xy['y'] - labelRightOffset, {
                align: 'left',
                stroke: 'blue',
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
    margin: 50,
    left: '5%',
    width: '60%'
  },

  yAxis: {
    tickPositions: [0, 50, 100, 150, 200, 250, 300, 350, 400],
    gridLineWidth: 0,
    width: '60%',
    left: '5%',
    title: {
      text: 'Amount'
    }
  },

  plotOptions: {
    pointPlacement: 'between',
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
