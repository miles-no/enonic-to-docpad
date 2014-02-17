var http = require('http-get'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    path = require('path'),
    rimraf = require('rimraf'),
    TaskGroup = require('taskgroup').TaskGroup,
    out = 'out/media',
    image_util = require('./modules/image-util');


function findImages(str){
  var match,
    urls = [],
    imageRegex = /image:\/\/(.*)\?.*/g,
    attRegex = /.*_attachment\/(\d*).*/g;

  while (match = imageRegex.exec(str)) {
    urls.push('http://miles.no/_image/' + image_util.getImageName(match[0]));
  }
  while (match = attRegex.exec(str)) {
    urls.push('http://miles.no/_attachment/' + match[1] + '.pdf');
  }
  return urls;
}

module.exports = function(text) {
  var done = false;
  if(!fs.existsSync(out))
    mkdirp.sync(out);

  new TaskGroup({
    concurrency: 10,
    tasks: findImages(text).map(function(url){
      return function(complete){
        var filename = path.basename(url);
        http.get(url, path.join(out, filename), function (error, result) {
          if (error) {
            console.error(error);
          } else {
            console.log('File downloaded: ' + result.file);
          }
          complete();
        });
      };
    }),
    next: function(error){
      done = true;
    }
  }).run();
};