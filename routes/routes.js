const path = require('path');

const appRouter = (app) => {

  app
    .get('/', (req, res) => {
      const html = `<h1>The <abbr title="Very Useful Tools to Remember">VUTTR</abbr> API is running here.</h1>
      <p>To see more about this API read the <a href="http://localhost:3000/docs">docs</a></p>`;

      res.send(html);
    })
    .get('/docs', (req, res) => {
      res.sendFile(path.resolve(`${__dirname}/../docs/index.html`));
    })
		.get('/tools', (req, res) => {
			res.send({ response: 'Tools'});
    })
    .post('/tools', (req, res) => {
      res.status(201).send('Ok');
    })
    .delete('/tools/:id', function (req, res) {
      res.status(200).send('Ok');
    });
};

module.exports = appRouter;
