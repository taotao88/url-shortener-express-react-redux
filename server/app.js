const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      path = require('path'),
      mongoose = require('mongoose'),
      app = express(),
      config = require('./config'),
      models = require('./models/url');

mongoose.connect('mongodb://'+config.db.host+'/'+config.db.name);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Always return the main index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.get('/:code', function(req, res){
  const code = req.params.code;
  // check if url already exists in database
  models.LinkModel.findOne({code: code}, function (err, doc){
    if (doc) {
      res.redirect(doc.long_url);
    } else {
      res.redirect(config.webserverhost);
    }
  });
});

app.post('/api/v1', (req, res) => {
  const longUrl = req.body.longUrl;
  let shortUrl = '';
  // Check if longUrl already exists.
  models.LinkModel.findOne({long_url: longUrl}, (err, doc) => {
    if(doc) {
      shortUrl = config.webserverhost+doc.code;
      res.send({
        shortUrl,
        longUrl,
        msg: 'URL already exists!',
        error: ''
      });
    } else {
      let link = models.LinkModel({long_url: longUrl});
      link.save( err => {
        if(err) {
          res.send({longUrl, shortUrl, error: err, msg: ''});
        }
      });
      res.send({longUrl, shortUrl: config.webserverhost+link.code, error: '', msg:'Shortened successfully.'});
    }
  });
});


module.exports = app;
