const Tools = require('../models/Tools');

const list = async (req, res) => {
  try {
    const prepareResponse = !req.query.tag
    ? await Tools.find({}, 'id title link description tags')
    : await Tools.find({ tags: req.query.tag });
    const response = prepareResponse.map(r => {
      return {
        id: r._id,
        title: r.title,
        link: r.link,
        description: r.description,
        tags: r.tags
      }
    });
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Erro ao buscar ferramentas!');
  }
};

const create = async (req, res) => {
  try {
    const { title } = req.body;
    if(!title)
      return res.status(400).send('É necessário que o nome da ferramenta seja enviado!');

    const beforeTool = await Tools.findOne({title});
    if(beforeTool)
      return res.status(400).send('Já existe uma ferramente cadastrada com este nome!');

    const prepareResponse = await Tools.create(req.body);
    const response = {
      title: prepareResponse.title,
      link: prepareResponse.link,
      description: prepareResponse.description,
      tags: prepareResponse.tags,
      id: prepareResponse._id
    };
    delete response._id;
    return res.status(201).send(response);
  } catch (error) {
    console.log(error)
    return res.status(500).send('Erro ao cadastrar uma nova ferramenta!');
  }
};
const del = async (req, res) => {
  const { id } = req.params;
  try {
    await Tools.deleteOne({ _id: id});
  } catch (error) {
    console.log(error);
    return res.status(500).send('Erro ao deletar ferramenta!');
  }
  return res.status(200).send('Ok');
};

module.exports = { list, create, del };
