const mongoose = require('../config/dbConnection');
const Schema = mongoose.Schema;

const ToolsSchema = new Schema({
  name: { type: String, required: true },
  link: String,
  description: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', ToolsSchema);
