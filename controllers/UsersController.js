require("dotenv").config();
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUserToken = userId => {
  return jwt.sign({ id: userId }, process.env.JWT_PASS, {
    expiresIn: process.env.EXPIRES_IN
  });
};

const list = async (req, res) => {
  try {
    const users = await Users.find({});
    return res.send(users);
  } catch (err) {
    return res.status(500).send({ error: "Erro na consulta de usuários!" });
  }
};

const create = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send({ error: "Dados insuficientes!" });

  try {
    if (await Users.findOne({ email }))
      return res.status(400).send({ error: "Usuário já registrado!" });

    const user = await Users.create(req.body);
    user.password = undefined;

    return res.status(201).send({ user, token: createUserToken(user.id) });
  } catch (err) {
    return res.status(500).send({ error: "Erro ao buscar usuário!" });
  }
};

const auth = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send({ error: "Dados insuficientes!" });

  try {
    const user = await Users.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).send({ error: "Usuário não registrado!" });

    const pass_ok = await bcrypt.compare(password, user.password);

    if (!pass_ok)
      return res.status(401).send({ error: "Erro ao autenticar usuário!" });

    user.password = undefined;
    return res.send({ user, token: createUserToken(user.id) });
  } catch (err) {
    return res.status(500).send({ error: "Erro ao buscar usuário!" });
  }
};

module.exports = { list, create, auth };
