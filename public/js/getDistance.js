// algorithm to return the distance in miles between two sets of coordinates

// The Haversine Formula
const R = 6371000; // ≈ the earths radius (close enough for jazz)
// a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)  // the square of half the cord length
// c = 2 ⋅ atan2( √a, √(1−a) ) // the angular distance in radians
// d = R ⋅ c // distance in Meters

function getDistance(coords1, coords2) {
    const phi1 = coords1.latitude * Math.PI / 180;
    const phi2 = coords2.latitude * Math.PI / 180;

    const deltaPhi = (coords2.latitude - coords1.latitude) * Math.PI / 180;
    const deltaLambda = (coords2.longitude - coords1.longitude) * Math.PI / 180;

    const a = Math.pow(Math.sin(deltaPhi / 2), 2) +
        Math.cos(phi1) * Math.cos(phi2) * Math.pow(Math.sin(deltaLambda / 2), 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c

    // return distance in miles
    return d / 1609.34
}

let c1 = {
    latitude: 34.0855782,
    longitude: -118.3863773
};

let c2 = {
    latitude: 34.034711879486345,
    longitude: -118.68583010257383
};