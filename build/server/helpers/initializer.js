// Generated by CoffeeScript 1.9.0
var File, Photo, async, convertImage, thumb;

Photo = require('../models/photo');

File = require('../models/file');

thumb = require('./thumb').create;

async = require('async');

convertImage = function(cb) {
  var convert;
  convert = function(doc, callback) {
    var error;
    if (doc._attachments != null) {
      try {
        console.log("Convert " + doc.title + " ...");
        return doc.convertBinary(function(err, res, body) {
          if (err != null) {
            console.log(err);
          }
          return callback(err);
        });
      } catch (_error) {
        error = _error;
        console.log("Cannot convert " + doc.title);
        return callback();
      }
    } else {
      return callback();
    }
  };
  return Photo.all(function(err, docs) {
    if (err) {
      return cb(err);
    } else {
      return async.eachSeries(docs, convert, cb);
    }
  });
};

module.exports.convert = function(socket, done) {
  if (done == null) {
    done = function() {
      return null;
    };
  }
  return done();
};
