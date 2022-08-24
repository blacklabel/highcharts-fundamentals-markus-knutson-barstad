/*
    Should i refactor things more in the render-function? 
    There is a decent amount of repetition there.
*/

const dataSets = [
    [50, 36, 50, 40, 14],
    [17, 45, 55, 78, 17]
  ];
  const bgSets = dataSets.map(set => set.map(n => 100 - n));
  
  Highcharts.chart('container', {
    chart: {
      type: 'bar',
      marginTop: 50,

      events: {
        render: function() {
          const ren = this.renderer;
  
          //axis-titles
          if (this.customAxisTitles) {
            this.customAxisTitles.forEach(l => l.destroy());
          }
  
          this.customAxisTitles = [];
          ['Manegerial positions', 'Non manegerial positions'].forEach((title, index) => {
            this.customAxisTitles.push(ren.label(title, this.yAxis[index].pos + this.yAxis[index].width / 2, 0));
          })
  
          this.customAxisTitles.forEach(l => {
            l.attr({
                align: 'center'
              })
              .css({
                fontWeight: 'bold',
                color: 'grey'
              })
              .add()
          });

          // The middle labels
          if (this.customLabels) {
            this.customLabels.forEach(l => l.destroy());
          }

          this.customLabels = [];
          ['Dep1', 'Dep2', 'Dep3', 'Dep4', 'Dep5'].forEach((text, i) => {
            this.customLabels.push(
              ren.label(
                text,
                this.chartWidth / 2,
                this.series[0].data[i].shapeArgs.x + 50 + (Math.abs(this.series[0].pointXOffset) / 3)
              )
            );
          });
  
          this.customLabels.forEach(l => {
            l.attr({
                align: 'center'
              })
              .css({
                fontSize: '11px',
                color: 'grey'
              })
              .add();
          });
  
          //a line hiding the last gridline of the right yAxis as shown in the screenshot
          if (this.customHiderLine) {
            this.customHiderLine.destroy();
          }
  
          this.customHiderLine = ren.path([
              'M', this.yAxis[1].pos + this.yAxis[1].width, this.xAxis[0].pos,
              'L', this.yAxis[1].pos + this.yAxis[1].width, this.xAxis[0].pos + this.yAxis[0].height
            ])
            .attr({
              'stroke-width': 5,
              stroke: '#FFFFFF'
            })
            .add()
            .toFront();
        }
      }
    },
  
    title: {
      text: ''
    },
  
    legend: {
      enabled: false
    },
  
    xAxis: {
      visible: false
    },
  
    yAxis: [{
        width: '40%',
        max: 100,
        tickInterval: 20,
        tickAmount: 6,
  
        left: '0%',
        reversed: true,
  
        title: {
          text: ''
        }
  
      },
      {
        width: '40%',
        max: 100,
        tickInterval: 20,
        tickAmount: 6,
  
        left: '60%',
        reversed: false,
  
        showLastLabel: false,
        offset: 0,
  
        title: {
          text: ''
        }
      },
    ],
  
    plotOptions: {
      series: {
        stacking: 'normal',
        clip: false,
  
        dataLabels: {
          enabled: true,
          color: 'white',
  
          formatter: function() {
            return this.y + '%';
          }
        }
  
      }
    },
  
    series: [
      //dummy data as backgrounds
      {
        color: '#A5B4C7',
        data: bgSets[0],
        yAxis: 0,
        dataLabels: {
          enabled: false
        }
      },
      {
        color: '#A5B4C7',
        data: bgSets[1],
        yAxis: 1,
        dataLabels: {
          enabled: false
        }
      },
      //actual data
      {
        color: 'red',
        data: dataSets[0],
        yAxis: 0,
        dataLabels: {
          align: 'right'
        }
  
      },
      {
        color: 'red',
        data: dataSets[1],
        yAxis: 1,
        dataLabels: {
          align: 'left'
        }
      },
    ],
  });
  