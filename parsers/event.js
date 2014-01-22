var fs = require('fs'),
    path = require('path'),
    moment = require('moment'),
    normalize = require('../normalize');

module.exports = function(folder, item){
  var content,
      title = item.title,
      city = item['rss:location']['#'],
      date = moment(item.pubdate).format('YYYY-MM-DD'),
      url = decodeURIComponent(item['rss:link']['#']),
      urlFragments = url.split('/'),
      filenamepart = urlFragments[urlFragments.length - 1],
      filepath = path.join(folder, city.toLowerCase()),
      filename = normalize(path.join(filepath, date + '-' + filenamepart + '.html.md')),
      author = item['rss:author']['#'],
      ingress = item['rss:ingress']['#'],
      text = item['rss:text']['#'];

  // normalize a bit
  text = text.replace(/(\n\s*)+/gm, '\n\n');

  content = '---\n';
  content += 'title: "' + title + '"\n';
  content += 'urls:\n';
  content += '  - '+ url.replace('http://www.miles.no', '') + '\n';
  content += 'published: true\n';
  content += 'author: "' + author + '"\n';
  content += 'ingress: "' + ingress + '"\n';
  content += '---\n\n';
  content += text;

  console.log(filename);
  if(!fs.existsSync(filepath)) fs.mkdirSync(filepath);
  fs.writeFileSync(filename, content);
};