
/*
    i chose to set an explicit width/height on this task because i was worried that the annotations would be
    out of place on your guys end without set bounds


    - how to place the annotations on the exact same line as the bars?
    - is there a way to snap them to grid?
    - should i try to reuse as much code as possible in these exercises

*/


Highcharts.chart("container",{
    title:null,
    chart: {
        type: "bar",
        margin:80,
        width:800,
        height:600,
    },

    xAxis: {
        
        categories:["data","emails","duplicates","support"],

        
        title: {
            align: "high",
            rotation: 0,
        },
        
        
    },

    yAxis: {
        tickInterval:50,
        tickAmount:9,
        title:{text:"Amount"},
    },

    plotOptions: {
        pointPlacement: "between",
        
        series: {
            stacking: 'normal',
            showInLegend: false,
        }
    },

    series: [
        {
            data: [20,0,20,10],
            
            dataLabels: {
                inside: false,
                enabled: true,
                format: "{total}K",
            }
        },
        {
            data: [100,120,70,50]
        },
        {
            data: [85,85,45,60]
        },
        {
            data: [20,0,15,10],
        }
    ],
    annotations: [{
        
        labels: 
            [{              
                point: {x: 0, y:-60},
                text: 'Issues',
                backgroundColor: "transparent",
                borderColor: "transparent"
            },
            {
                point: {x: 0, y: 550},
                text: 'Record Count',
                backgroundColor: "transparent",
                borderColor: "transparent"
            },
            {
                point: {x: 0, y: 25},
                text: 'Action',
                backgroundColor: "transparent",
                borderColor: "transparent"
            },
            {              
                point: {x: 53*7, y:600},
                text: 'How to fix',
                backgroundColor: "transparent",
                borderColor: "blue",
                borderWidth:2
            },
                // "how to fix"-labels are below
            {              
                point: {x: 53*5, y:600},
                text: 'How to fix',
                backgroundColor: "transparent",
                borderColor: "blue",
                borderWidth:2
            },
            {              
                point: {x: 53*3, y:600},
                text: 'How to fix',
                backgroundColor: "transparent",
                borderColor: "blue",
                borderWidth:2
            },
            {              
                point: {x: 53, y:600},
                text: 'How to fix',
                backgroundColor: "transparent",
                borderColor: "blue",
                borderWidth:2
            },

        ],

        labelOptions: {
            overflow:"allow",
            verticalAlign: 'top',

            style:{
                fontSize:"13px"
            }
        }
    }]
    
})