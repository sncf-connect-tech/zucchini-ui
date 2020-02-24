migrate(() => {

  db.scenarii.createIndex({ "info.name": 1 });

});
