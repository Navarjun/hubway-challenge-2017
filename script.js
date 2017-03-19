const canvas = d3.select("canvas")
  .attr("width", window.innerWidth)
  .attr("height", window.innerHeight);
const context = new Context(canvas.node().getContext('2d'));
const m = {l: 50, t: 50, r: 50, b: 50};
const width = window.innerWidth - m.l - m.r;
const height = window.innerHeight - m.t - m.b;

const projection = d3.geoMercator()
  .center([-71.0589, 42.3401])
  .scale(300000)
  .translate([(width/2)+m.l, (height/2)+m.t]);

const path = d3.geoPath()
  .projection(projection)
  .context(canvas.node().getContext('2d'));

const roadLayer = new Layer(context);
context.addLayer("roads", roadLayer);

d3.queue()
  .defer(d3.json, "roadmaps/boston_roads.json")
  .defer(d3.json, "roadmaps/brookline_roads.json")
  .defer(d3.json, "roadmaps/cambridge_roads.json")
  .defer(d3.json, "roadmaps/somerville_roads.json")
  .awaitAll((err, results) => {
    if (err) return; // ERROR HANDLING
    // console.log(err, results);
    results.forEach((d, i) => {
      roadLayer.addDrawing(`roads-${i}`, (ctx) => {
        ctx.beginPath();
        path(d);
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.fill();
        ctx.lineWidth = "0.5";
        ctx.strokeStyle = '#c9c4bc';
        ctx.stroke();
      });
    });

    roadLayer.draw();
    startHubwayViz();
  });

function startHubwayViz() {
  getStationDataFromHubway((err, data) => {
    if (err) {
      setTimeout(startHubwayViz, 0);
      return;
    }
    getTripsFromHubway({bike_nr: "B00387"}, (err, data) => {
      console.log(err, data[0]);
    });
  })
}
