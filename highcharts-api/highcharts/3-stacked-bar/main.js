const destroyArr = (arr) => arr.forEach(obj => obj.destroy());

const destroyObjects = (obj) => Array.isArray(obj) ? destroyArr(obj) : obj.destroy();

const clearScreen = (toClear) => toClear && destroyObjects(toClear);

const makeLabel = (ren, text, xPos, yPos) => ren.label(text, xPos, yPos).attr({align:'left'}).add().toFront();

Highcharts.chart('container', {
  title: {
    text: ''
  },

  chart: {
    type: 'bar',
    margin: 50,

    events: {
      render: function () {
        const chart = this;
        const ticks = Object.values(chart.xAxis[0].ticks).slice(0,-1);
        const rightLabelX = chart.yAxis[0].ticks[400].label.xy['x'];

        clearScreen(chart.issueLabel);
        clearScreen(chart.fixLabels);
        clearScreen(chart.actionLabel);
        clearScreen(chart.recordLabel);

        chart.issueLabel;
        chart.recordLabel; 
        chart.actionLabel;
        chart.fixLabels = [];

        chart.issueLabel = makeLabel(
          chart.renderer, 
          'Issue',
          0,
          20
          );

        chart.recordLabel = makeLabel(
          chart.renderer, 
          'Record Count',
          chart.yAxis[0].ticks[0].label.xy['x'],
          20
          );

        chart.actionLabel = makeLabel(
          chart.renderer, 
          'Action', 
          rightLabelX,
          20
          );

        ticks.forEach((tick, index) => {  
          chart.fixLabels.push(
            chart.renderer.label(
                'How to fix',
                rightLabelX,
                tick.label.xy['y'] - ((Math.round(chart.series[0].data[0].shapeArgs.width) / 2)) - (index % 2 == 0 ? 3 : 4)
              )
              .attr({
                align:'left',
                stroke: 'blue',
                'stroke-width':5,
                padding:12
              })
              .add()
              .toFront()
            );
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
    left:'5%'
  },

  yAxis: {
    tickPositions: [0,50,100,150,200,250,300,350,400],
    gridLineWidth: 0,
    width:'60%',
    left:'5%',
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
      data: [0,0,0,0],
      dataLabels: {
        inside: false,
        enabled: true,
        format: '{total}K'
      }
    },
    {
      color: '#F9D949',
      data: [20, 0, 20, 10]
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
