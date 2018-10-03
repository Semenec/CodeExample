const {
  createActor,
  updateActor,
  removeActor,
  listActor
} = require('./middleware/actor')

const {
  createPermission,
  updatePermission,
  removePermission,
  listPermission,
  ListWithoutDuplicatePermission
} = require('./middleware/permission');

const {
  createAgent,
  updateAgent,
  removeAgent,
  listAgent
} = require('./middleware/agent');

const {
  createOrganisation,
  updateOrganisation,
  removeOrganisation,
  listOrganisation
} = require('./middleware/organisations');

const ErrorsHandler = require('./middleware/errorsHandler');

module.exports = app => {

  //PERMISSION METHODS

  app.delete('/permission', removePermission);
  app.put('/permission', updatePermission);
  app.get('/permission-list-without-duplicate', ListWithoutDuplicatePermission);
  app.get('/permission-list', listPermission);
  app.post('/permission', createPermission);

  //ACTORS METHODS

  app.put('/actor', updateActor);
  app.delete('/actor', removeActor);
  app.get('/actors-list', listActor);
  app.post('/actor', createActor);


  //AGENTS METHODS 

  app.put('/agent', updateAgent);
  app.delete('/agent', removeAgent);
  app.get('/agents-list', listAgent);
  app.post('/agent', createAgent);

  //ORGANISATIONS METHODS

  app.put('/organisation', updateOrganisation)
  app.delete('/organisation', removeOrganisation)
  app.get('/organisations-list', listOrganisation)
  app.post('/organisation', createOrganisation)

  //ERRORS HANDLER
  
  app.use(ErrorsHandler)
}