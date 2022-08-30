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

  chart: {
    type: 'bar',
    marginTop: 50,
    
    events: {
      render: function() {
        //clearing
        const chart = this;
        const ren = chart.renderer;
        const secondYAxis = chart.yAxis[1];

        clearScreen(chart.customAxisTitles);
        clearScreen(chart.customLabels);
        
        chart.customAxisTitles = [];
        chart.customLabels = [];

        //custom titles
        ['Manegerial positions', 'Non manegerial positions'].forEach((title, index) => {
          chart.customAxisTitles.push(
            ren.label(title, chart.yAxis[index].pos + chart.yAxis[index].width / 2, 0)
            .attr({
              align: 'center'
            })
            .css({
              fontWeight: 'bold',
              color: 'grey'
            })
          );
        })
        chart.customAxisTitles.forEach(l => l.add());
      }
    }
  },

  title: {
    text: ''
  },

  legend: {
    enabled: false
  },

  xAxis: [{
    lineWidth: 0,
    lineColor: 'transparent',
    tickWidth:0,
    left: "50%",

    labels: {
      align:"left",
      formatter: function () {
        return "Dep" + (5 - this.pos);
      }
    }
  }],

  yAxis: [{
      tickPositions: [0,20,40,60,80,100], 
      left: '0%',
      reversed: true,
      ...YAXIS_PROPS
    },
    { 
      tickPositions: [0,20,40,60,80],  
      left: '60%',
      endOnTick: false,
      showLastLabel: true,
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