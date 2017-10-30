const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      shortid = require('shortid');


mongoose.Promise = require('bluebird');

// Use Link to replace URL in order to use new algorithm.
const LinkModelSchema = new Schema({
  long_url: { type: String, index: { unique: true } },
  code: { type: String, index: { unique: true }, default: shortid.generate },
  created_at: { type: Date, default: Date.now }
});

const LinkModel = mongoose.model('LinkModel', LinkModelSchema);

module.exports.LinkModel = LinkModel;



