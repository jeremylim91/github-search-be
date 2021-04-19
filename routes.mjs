import initReposController from './controllers/repos.mjs'
import initUsersController from './controllers/users.mjs'


export default function bindRoutes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks

  const UsersController= initUsersController()
  app.get('/users/:query', UsersController.index);
  
  const ReposController= initReposController()
  app.get('/repos/:query', ReposController.index);
}
