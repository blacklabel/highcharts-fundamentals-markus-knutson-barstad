(function (H){
    let data = [];
    const currencyChart = H.stockChart('container', {
        title: {
            text: 'USD TO ISK'
        },
        series: [{
            name: "ISK",
            data: data
        }]
    });

    setInterval(()=> {
        H.getJSON('https://open.er-api.com/v6/latest/USD', function (resp) {
            data.push(resp.rates['ISK']);
        });

        currencyChart.series[0].setData(data);
    }, 1000);

}(Highcharts));