module.exports = {

 isAContributor: function (uid, contributors) {
    let result = false;
    contributors.forEach((contributor) => {
      if (contributor.id === uid
        || contributor.u_id === uid) {
        result = true;
      }
    });
    return result;
  }
}
