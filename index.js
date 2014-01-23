var FeedParser = require('feedparser'),
    request = require('request'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    path = require('path'),
    rimraf = require('rimraf'),
    moment = require('moment'),
    TaskGroup = require('taskgroup').TaskGroup,
    feeds = [{
      url: 'http://www.miles.no/eksport/nyheter',
      path: 'out/nyheter',
      parse: require('./parsers/article'),
      enabled: true
    },{
      url: 'http://www.miles.no/eksport/ansatte',
      path: 'out/ansatte',
      parse: require('./parsers/employee'),
      enabled: true
    },{
      url: 'http://www.miles.no/eksport/smiles',
      path: 'out/smiles',
      parse: require('./parsers/event'),
      enabled: true
    }];

var logonly = process.argv.length > 2 && process.argv[2] === 'log';

function safeGet(name){
  var rss = this['rss:' + name];
  if(rss && rss['#']) {
    return rss['#'];
  } else {
    return '';
  }
}

new TaskGroup ({
  concurrency: 0,
  tasks: feeds.map(function(feed){
    return function(complete){
      if(feed.enabled === false){
        complete();
        return;
      }
      if(fs.existsSync(feed.path)) rimraf.sync(feed.path);
      mkdirp.sync(feed.path);

      request(feed.url)
        .on('error', function (error) {
          console.log(error);
        })
        .pipe(new FeedParser())
        .on('error', function(error) {
          console.log(error);
        })
        .on('readable', function () {
          var stream = this, item;
          while (item = stream.read()) {
            if(logonly){
              console.log(item);
            } else {
              try {
                item.safeGet = safeGet.bind(item);

                feed.parse(feed.path, item);
              } catch(err){
                console.log(err);
              }
            }
          }
          complete();
        });
    };
  }),
  next: function(error){
    if(error) console.log(error);
  }
}).run();