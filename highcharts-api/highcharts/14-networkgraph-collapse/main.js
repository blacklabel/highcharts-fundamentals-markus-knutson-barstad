Highcharts.Series.prototype.onMouseOut = () => Highcharts.fireEvent(this, 'mouseOut');
const hidePoint = (link) => {
 link.graphic.hide();
 link.toNode.graphic.hide();
 link.toNode.dataLabel.hide();
 link.toNode.linksFrom.forEach(childLink => hidePoint(childLink));
};
const showPoint = (link) => {
 link.graphic.show();
 link.toNode.graphic.show();
 link.toNode.dataLabel.show();
 link.toNode.linksFrom.forEach(childLink => showPoint(childLink));
};

Highcharts.chart('container', {
 chart: {
   type: 'networkgraph'
 },
 title: {
   text: 'Asian towns by country'
 },
 plotOptions: {
   networkgraph: {
     keys: ['from', 'to']
   }
 },
 series: [{
   marker: {
     radius: 20
   },
   point: {
     events: {
       click: function() {
         const point = this;
         if (!point.linksHidden) {
           point.linksHidden = true;
           point.linksFrom.forEach(function(link) {
             hidePoint(link);
           });
         } else {
           point.linksHidden = false;
           point.linksFrom.forEach(function(link) {
             showPoint(link);
           });
         }
       }
     }
   },
   dataLabels: {
     enabled: true,
     linkFormat: ''
   },
   data: [{
       from: 'Ancient countries',
       to: 'Egypt'
     },
     {
       from: 'Ancient countries',
       to: 'Persia'
     },
     {
       from: 'Ancient countries',
       to: 'Greece'
     },
     {
       from: 'Egypt',
       to: 'Memphis'
     },
     {
       from: 'Egypt',
       to: 'Thebes'
     },
     {
       from: 'Egypt',
       to: 'Alexandria'
     },
     {
       from: 'Persia',
       to: 'Perspepolis'
     },
     {
       from: 'Persia',
       to: 'Babylon'
     },
     {
       from: 'Persia',
       to: 'Bactria'
     },
     {
       from: 'Greece',
       to: 'Athens'
     },
     {
       from: 'Greece',
       to: 'Sparta'
     },
     {
       from: 'Greece',
       to: 'Corinth'
     }
   ]
 }]
});