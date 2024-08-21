const mongoose = require('mongoose');

const file = new mongoose.Schema({
  name: { type: String, required: true},
  toml: { type: Object, required: true },
  author: { type: String, required: true, unique: true },
  description: { type: String, required: false},
  date: {type: String}
});

const File = mongoose.model('File', file);

module.exports = File;