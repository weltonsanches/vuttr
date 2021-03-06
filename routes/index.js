const router = require('express').Router();
const path = require('path');
const ToolsController = require('../controllers/ToolsController');
const UsersController = require('../controllers/UsersController');

router
  .get('/', (req, res) => {
    const message = {
      title: 'VUTTR API',
      message: 'The VUTTR API is running here. To see more about this API read the docs in http://localhost:3000/docs',
      docs: 'http://localhost:3000/docs'
    };
    res.send(message);
  })
  .get('/docs', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../docs/index.html`));
  })
  .get('/tools', ToolsController.list)
  .post('/tools', ToolsController.create)
  .delete('/tools/:id', ToolsController.del)
  .get('/users/', UsersController.list)
  .post('/users/create', UsersController.create)
  .post('/users/auth', UsersController.auth);

module.exports = router;
