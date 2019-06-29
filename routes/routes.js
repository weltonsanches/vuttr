const path = require('path');
//const Tools = require('../models/Tools');

const appRouter = (app) => {

  app
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
		.get('/tools', (req, res) => {

      if(req.query.tag)
        response = response.filter(tool => tool.tags.includes(req.query.tag));
			res.send(response);
    })
    .post('/tools', (req, res) => {
      res.status(201).send('Ok');
    })
    .delete('/tools/:id', function (req, res) {
      res.status(200).send('Ok');
    });
};

module.exports = appRouter;
