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
      return 'male';
    }
    if (str === 'f') {
      return 'female';
    }
    if (str === 'o') {
      return 'Non-Binary';
    }
    return null;
  }
}