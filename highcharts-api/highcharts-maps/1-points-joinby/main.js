/*
i think we wrap the chart in the asynchronous function so that we can make sure
to build our chart only after we have gotten a response
*/

(async () => { 
  const mapDataResponse = await fetch(
    'https://code.highcharts.com/mapdata/custom/world.topo.json'
  ).then(response => response.json());

  // Create the chart
  Highcharts.mapChart('container', {
    chart: {
      map: mapDataResponse
    },

    //did this and the setting in the first series just for displaying them at the same time
    plotOptions: {
      map: {
        allAreas: false,
      }
    },

    series: [{
      allAreas: true,
      data: [ //the iso-a3 was not working, regardless of upper/lowercase!
        ['pl', 100],
        ['us', 90],
        ['pe', 50],
        ['tz', 40],
        ['au', 1]
      ],
    }, {
      data: [
        ['gl', 1],
        ['cn', 1],
        ['er', 1]
      ]
    }]
  });
})(); //we init the function above