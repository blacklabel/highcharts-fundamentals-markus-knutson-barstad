
//middle of the chart, its initial value is half the size of the container
let chartMid = 500;

const dataSets = [
  [50, 36, 50, 40, 14],
  [17, 45, 55, 78, 17]
];

const bgSets = dataSets.map(set => set.map(n => 100 - n));

const BG_PROPS = {
  color: '#A5B4C7',
  enableMouseTracking: false,
  dataLabels: {
    enabled: false
  }
};

const YAXIS_PROPS = {
  tickPositions: [0,20,40,60,80,100], 
  width: '40%',
  max: 100,
  title: {
    text: ''
  }
};

const clearScreen = (toClear) => {
  if(toClear){
    Array.from(toClear).forEach(obj => obj.destroy());
  }
}

Highcharts.chart('container', {
  accessibility: {
    enabled: false
  },

  chart: {
    type: 'bar',
    marginTop: 50,

    events: {
      render: function() {
        //clearing
        clearScreen(this.customAxisTitles);
        clearScreen(this.customHiderLine);

        //declaring
        chartMid = this.chartWidth / 2;
        const ren = this.renderer;
        this.customAxisTitles = [];
        this.customLabels = [];

        //hiderline
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

        //custom titles
        ['Manegerial positions', 'Non manegerial positions'].forEach((title, index) => {
          this.customAxisTitles.push(
            ren.label(title, this.yAxis[index].pos + this.yAxis[index].width / 2, 0)
            .attr({
              align: 'center'
            })
            .css({
              fontWeight: 'bold',
              color: 'grey'
            })
          );
        })
        this.customAxisTitles.forEach(l => l.add());
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
    lineWidth: 0,
    lineColor: 'transparent',
    tickWidth:0,
    labels: {
      x: chartMid,
      formatter: function () {
        return "Dep" + (5 - this.pos);
      }
    }
  },

  yAxis: [{
      left: '0%',
      reversed: true,
      ...YAXIS_PROPS
    },
    {  
      left: '60%',
      showLastLabel: false,
      offset: 0,
      ...YAXIS_PROPS
    },
  ],

  plotOptions: {
    series: {
      stacking: 'normal',
      
      dataLabels: {
        enabled: true,
        color: 'white',
        format: '{y}%'
      }

    }
  },

  series: [
    //dummy data as backgrounds
    {
      data: bgSets[0],
      yAxis: 0,
      ...BG_PROPS
    },
    {
      data: bgSets[1],
      yAxis: 1,
      ...BG_PROPS
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
    }
  ]
});
