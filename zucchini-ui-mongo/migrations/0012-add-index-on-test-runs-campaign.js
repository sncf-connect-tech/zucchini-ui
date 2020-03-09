migrate(() => {

  db.testRuns.createIndex({ "campaign": 1 }, {background: true});

});
