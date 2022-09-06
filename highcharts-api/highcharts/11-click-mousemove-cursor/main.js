const c = Highcharts.chart('container', {
  chart: {
    events: {
      render: function() {
        const chart = this;

        if (chart.circles) {
          chart.circles.forEach(c => c.destroy());
        }

        chart.circles = [];
        chart.staticCircleData.forEach(c => chart.circles.push(chart.buildCircle(c).add()));
      },
      load: function() {
        this.buildCircle = (c) => this.renderer.circle(c.x, c.y, c.r).attr({
          fill: '#00FFFF'
        });
        this.follower = this.buildCircle({
          x: 0,
          y: 0,
          r: 20
        });
        this.staticCircleData = [];
      },
      resize: function() {
        this.staticCircleData = [];
        this.redraw();
      }
    }
  },
  legend: {
    enabled: false
  },
  yAxis: {
    title: {
      text: ''
    }
  },
  series: [{
    events: {
      mouseOver: function() {
        this.chart.follower.add();
      }
    },
    data: [43, 486, 651, 27, 11, 233, 173, 165, 17, 64, 150]
  }]
});

document.addEventListener('mousemove', (e) => c.follower.translate(e.clientX, e.clientY));
document.addEventListener('click', (e) => {
  c.staticCircleData.push({
    x: e.clientX,
    y: e.clientY,
    r: 20
  });
  c.redraw();
});
