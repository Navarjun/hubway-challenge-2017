const hubwayAPIKey = "4b59dd6d8d2d7a26a97572f133a5650dcebc4ed8";

const serialize = function(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

let stations = undefined;

function getTripsFromHubway(params, callback) {
  params["format"] = "json";
  params["username"] = "NavarjunSingh";
  params["api_key"] = hubwayAPIKey;
  const queryString = serialize(params);
  d3.json("http://hubwaydatachallenge.org/api/v1/trip/?"+queryString, (err, data) => {
    setTimeout(callback, 0, err, data.objects.map(d => { d.end_date = new Date(d.end_date); d.start_date = new Date(d.start_date); return d; }));
  });
}

function getStationDataFromHubway(callback) {
  const params = {};
  params["format"] = "json";
  params["username"] = "NavarjunSingh";
  params["api_key"] = hubwayAPIKey;
  const queryString = serialize(params);
  d3.json(`http://hubwaydatachallenge.org/api/v1/station/?${queryString}`+queryString, (err, data) => {
    if (err) {
      setTimeout(callback, 0, err, data);
      return;
    }
    const stationsArray = data.objects;
    stations = d3.map(stationsArray, (d) => d["resource_uri"]);
    setTimeout(callback, 0, err, data);
  });
}
