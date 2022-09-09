// Highcharts.getJSON('https://api.opensea.io/api/v1/assets?format=json', function (data) {
    
//     console.log(data);

//     adaptedDataArr = [];
//     data.assets.forEach(a => {
//         adaptedDataArr.push([a.id, a.asset_contract.opensea_seller_fee_basis_points]);
//     })

//     Highcharts.stockChart('container', {

//         title: {
//             text: 'AAPL Stock Price'
//         },

//         series: [{
//             name: 'AAPL',
//             data: adaptedDataArr,

//             tooltip: {
//                 valueDecimals: 2
//             }
//         }]
//     });
// });

//https://api.coingecko.com/api/v3/exchanges


Highcharts.getJSON('http://api.open-notify.org/iss-now.json', function (data) {
    Highcharts.stockChart('container', {
        title: {
            text: 'ETH 2 BTC'
        },
        data:{
            enablePolling: true,
            dataRefreshRate: 1
        },
        series: [{
            data: [
                [data.latitude,data.longitude]
            ],
        }]
    });
});
