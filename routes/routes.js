
const appRouter = (app) => {

  app
		.get('/tools', (req, res) => {
			res.send({ response: 'Tools'});
    })
    .post('/tools', (req, res) => {
      res.status(201).send('Ok');
    })
    .delete('/', function (req, res) {
      res.status(200).send('Ok');
    });
};

module.exports = appRouter;
