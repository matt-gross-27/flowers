// algorithm to return the distance between my location and an object containing lat lon coords

function getMyLocation(event) {
  navigator.geolocation.getCurrentPosition((myLocation, err) => {
    if (err) {
      console.log(err);
      return;
    }
    const myPos = {
      latitude: parseFloat(myLocation.coords.latitude.toPrecision(8)),
      longitude: parseFloat(myLocation.coords.longitude.toPrecision(8))
    }

    console.log(myPos);
  });
};

function getDistance(myPos) {
  console.log(myPos.coords.latitude);
  console.log(myPos.coords.longitude);
}

getMyLocation();
