migrate(() => {

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////// WARNING : SLOW QUERIES !!!  FOR EXAMPLE: IT TOOK 160s TO UPDATE 266204 DOCUMENTS /////////////////////////////////
  /////////// PLEASE CONSIDER NOTICEABLE SHORTAGE DURING MIGRATION (DEPENDING ON NUMBER OF FEATURES + SCENARIOS)////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Moving feature's location field to basicInfo attribute
  db.features.updateMany({'location': {$exists: true}}, {$rename: {'location': 'info.location'}});

// Defaulting missing scenario & steps locations to a default value
// Notes:
// - The "real" locations are only available on imports (cucumber.json)
// - All existing scenarios (before this feature) do not have any 'real' locations
// - Thus, we use static values as placeholders for the migration
  db.scenarii.updateMany(
    {'steps': {$exists: true}, 'steps.info.location': {$exists: false}, 'info.location': {$exists: false}},
    {
      $set: {
        'info.location': {'filename': 'zucchini-migration-init.feature', 'line': NumberLong(1)},
        'steps.$.info.location': {'filename': 'zucchini-migration-init.feature', 'line': NumberLong(1)}
      }
    });

});
