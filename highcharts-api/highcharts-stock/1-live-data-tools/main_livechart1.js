// setInterval(()=>{
//     Highcharts.getJSON('https://jsonplaceholder.typicode.com/posts/1', function(resp){
//         console.log(resp);
//     });
    
// },3000);


(function (H){
    const datas ={
		dataLeft: [],
		//dataRight: []
	};
    
	const leftChart = H.stockChart('container', {
        title: {
            text: 'LEFT'
        },

        series: [{
            data: data.left,
        }]
    });
	/*
	const rightChart = H.stockChart('container', {
        title: {
            text: 'RIGHT'
        },

        series: [{
            data: data.right,

        }]
    });
*/
    setInterval(()=> {
        H.getJSON('http://api.open-notify.org/iss-now.json', function (resp) {
            data.push([resp.iss_position.latitude,resp.iss_position.longitude]);
        });
        console.log(resp);
        leftChart.series[0].setData(data.left);
		//rightChart.seires[0].setData(data.right);
    }, 1000);

}(Highcharts));

// (function (H){
//     let data = [];
//     const currencyChart = H.stockChart('container', {
//         title: {
//             text: 'USD TO ISK'
//         },

//         series: [{
//             name: "ISK",
//             id:"isk",
//             data: data,
//             dataGrouping:{
//                 enabled:true,
//                 forced:true,
//             }
//         }
//     });

//     setInterval(()=> {
//         H.getJSON('https://open.er-api.com/v6/latest/USD', function (resp) {
//             data.push(resp.rates['ISK']);
//         });

//         currencyChart.series[0].setData(data);
//     }, 1000);

// }(Highcharts));