Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: ''
    },
    plotOptions:{
    	series:{
    		point:{		
		    	events:{
		    		mouseOver: function(e){
		    			const newCats = this.series.xAxis.categories;
		    			newCats[this.index] = String('<span style="color: #EE4B2B;font-size:12px;font-weight:bold;">' + this.category + '</span>');
		    			this.series.xAxis.update({categories: newCats});
		    		},
		    		
		    		mouseOut: function(e){
		    			const newCats = this.series.xAxis.categories;
		    			newCats[this.index] = newCats[this.index].split('>')[1].split('<')[0];
		    			this.series.xAxis.update({categories: newCats});
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