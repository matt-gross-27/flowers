module.exports = {
  format_date: date => {
    return `${new Date(date).getMonth() + 1}/`
      + `${new Date(date).getDate()}/`
      + new Date(date).getFullYear().toString().substr(2, 2);
  },
  format_plural: (str, num) => {
    return (num === 1 ? str : `${str}s`);
  },
  format_possessive: str => {
    return (str.slice(-1).toLowerCase() === 's' ? `${str}'` : `${str}'s`)
  },
  format_gender: str => {
    if (str === 'm') {
      return 'Male';
    }
    if (str === 'f') {
      return 'Female';
    }
    if (str === 'o') {
      return 'Non-Binary';
    }
    return null;
  },
  getDistance: (lat1, lon1, lat2, lon2) => {
  const R = 6371000;
  const phi1 = lat1 * Math.PI / 180;
  const phi2 = lat2 * Math.PI / 180;
  const deltaPhi = (lat2 - lat1) * Math.PI / 180;
  const deltaLambda = (lon2 - lon1) * Math.PI / 180;
  const a = Math.pow(Math.sin(deltaPhi / 2), 2) +
            Math.cos(phi1) * Math.cos(phi2) * Math.pow(Math.sin(deltaLambda / 2), 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c / 1609.34
  if (d < 1) {
    return Math.ceil(d);
  }
  return Math.round(d);
  }
};