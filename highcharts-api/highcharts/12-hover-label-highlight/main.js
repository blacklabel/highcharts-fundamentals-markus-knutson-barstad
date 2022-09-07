let highlightedCategory = '';

Highcharts.chart('container', {
    chart: {
        type: 'column',
        animation: false
    },
    title: {
        text: ''
    },
    plotOptions:{
    	series:{
    		point:{		
		    	events:{
		    		mouseOver: function(e){
                        highlightedCategory = this.category;
                        this.series.chart.redraw();
		    		},
		    		mouseOut: function(e){
                        highlightedCategory = '';
                        this.series.chart.redraw();
		    		}
		    	}
    		}
    	}
    },
    xAxis: {
        categories: [
            '2010',
            '2011',
            '2012',
            '2013',
            '2014',
            '2015',
            '2016',
            '2017',
            '2018',
            '2019',
            '2010',
            '2021'
        ],

        labels: {
            enabled:true,
            formatter: function(){
                return this.value === highlightedCategory 
                ? '<span style="color: #EE4B2B;font-size:12px;font-weight:bold;">' + this.value + '</span>'
                : this.value;
            }
        }
    },
    yAxis: {
        title: {
           text:''
        }
    },

    series: [{
        name: 'Oil and gas extraction',
        data: [13.93, 13.63, 13.73, 13.67, 14.37, 14.89, 14.56,
            14.32, 14.13, 13.93, 13.21, 12.16]

    }, {
        name: 'Manufacturing industries and mining',
        data: [12.24, 12.24, 11.95, 12.02, 11.65, 11.96, 11.59,
            11.94, 11.96, 11.59, 11.42, 11.76]

    }, {
        name: 'Road traffic',
        data: [10.00, 9.93, 9.97, 10.01, 10.23, 10.26, 10.00,
            9.12, 9.36, 8.72, 8.38, 8.69]

    }, {
        name: 'Agriculture',
        data: [4.35, 4.32, 4.34, 4.39, 4.46, 4.52, 4.58, 4.55,
            4.53, 4.51, 4.49, 4.57]
    }]
});