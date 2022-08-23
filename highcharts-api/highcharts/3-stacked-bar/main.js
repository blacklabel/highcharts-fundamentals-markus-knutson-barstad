/*
  A few notes about the "How to solve"-annotation-labels:
    - On this task i intentionally created a series which only holds value pairs of unique IDs and the value '0'
    - I then create annotations with points which refer to the ID of these pairs.
    - Since the values in this specific series is the same, the x-positions of the annotations will stay the same across all the 
    - the Y-values of the annotations is derived from the series so that a given annotations position corresponds to a series position

  Question:
    - would it be possible to solve this without the "dummy"-series? tying points to the axes maybe?
    - How much "magic numbers" is okay? is there a clear guideline here?
    - Should I refactor the labels
*/

Highcharts.chart('container', {
  accesiblity: false,

  title: {
    text: ''
  },

  chart: {
    type: 'bar',
    width: 800,
    height: 600,
    margin: 160

  },

  xAxis: {
    width: 600,

    labels: {
      align: "right",
    },

    left: 60,
    offset: -100,
    categories: ['data', 'emails', 'duplicates', 'support'],
    gridLineWidth: 1,
    lineWidth: 0

  },

  yAxis: {

    gridLineWidth: 0,
    tickLength: 60,
    tickInterval: 50,
    tickAmount: 9,

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
      data: [{
          id: '0',
          y: 0
        },
        {
          id: '1',
          y: 0
        },
        {
          id: '2',
          y: 0
        },
        {
          id: '3',
          y: 0
        }
      ],

      dataLabels: {
        inside: false,
        enabled: true,
        format: '{total}K'
      }
    },
    {
      color: "#F9D949",
      data: [20, 0, 20, 10],
    },
    {
      color: "#B99C45",
      data: [100, 120, 70, 50]
    },
    {
      color: "#95BA92",
      data: [85, 85, 45, 60]
    },
    {
      color: "#A77D82",
      data: [20, 0, 15, 10],
    }
  ],

  annotations: [{
    dragable: true,
    labels: [{
        align: 'right',
        point: {
          x: 13,
          y: -48
        },
        verticalAlign: 'bottom',
        text: 'Issue',
        backgroundColor: "transparent",
        borderColor: "transparent",

        overflow: "none",
        crop: false
      },
      {
        //align: 'left',
        point: {
          x: -12,
          y: 0
        },
        verticalAlign: 'bottom',
        text: 'Record count',
        backgroundColor: "transparent",
        borderColor: "transparent"
      },

      {
        align: 'left',
        point: {
          x: -12,
          y: 390
        },
        verticalAlign: 'bottom',
        text: 'Action',
        backgroundColor: "transparent",
        borderColor: "transparent"
      },

      //how to solve's
      {
        align: 'right',
        point: '0',
        x: 600,
        text: 'How to solve',

        backgroundColor: 'transparent',
        shape: 'rect',
        verticalAlign: 'top',
        borderColor: 'blue',
        borderWidth: 2
      },
      {
        align: 'right',
        point: '1',
        x: 600,
        text: 'How to solve',

        backgroundColor: 'transparent',
        shape: 'rect',
        verticalAlign: 'top',
        borderColor: 'blue',
        borderWidth: 2
      },
      {
        align: 'right',
        point: '2',
        x: 600,
        text: 'How to solve',

        backgroundColor: 'transparent',
        shape: 'rect',
        verticalAlign: 'top',
        borderColor: 'blue',
        borderWidth: 2
      },
      {
        align: 'right',
        point: '3',
        x: 600,
        text: 'How to solve',

        backgroundColor: 'transparent',
        shape: 'rect',
        verticalAlign: 'top',
        borderColor: 'blue',
        borderWidth: 2
      }
    ],

    labelOptions: {
      allowOverlap: true,

      style: {
        fontSize: '13px'
      }
    }
  }]
});
