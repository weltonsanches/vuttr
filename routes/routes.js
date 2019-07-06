const path = require('path');
const Tools = require('../models/Tools');

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
		.get('/tools', async (req, res) => {
      try {
        let response = !req.query.tag ? await Tools.find({}) : await Tools.find({ tags: req.query.tag });
        return res.status(200).send(response);
      } catch (error) {
        console.log(error);
        return res.status(400).send('Erro ao buscar ferramentas!');
      }
    })
    .post('/tools', async (req, res) => {
      try {
        const { name } = req.body;
        if(!name)
          return res.status(400).send('É necessário que o nome da ferramenta seja enviado!');

        const beforeTool = await Tools.findOne({name});
        if(beforeTool)
          return res.status(400).send('Já existe uma ferramente cadastrada com este nome!');

        const response = await Tools.create(req.body);
        return res.status(201).send(response);
      } catch (error) {
        console.log(error)
        return res.status(400).send('Erro ao cadastrar uma nova ferramenta!');
      }
    })
    .delete('/tools/:id', async function (req, res) {
      const { id } = req.params;

      try {
        await Tools.deleteOne({ _id: id});
      } catch (error) {
        console.log(error);
      }
      return res.status(200).send('Ok');
    });
};

module.exports = appRouter;
