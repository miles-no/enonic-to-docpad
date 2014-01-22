var fs = require('fs'),
    path = require('path'),
    moment = require('moment'),
    normalize = require('../normalize');

module.exports = function(folder, item){
  var content,
      title = item.title,
      date = moment(item.pubdate).format('YYYY-MM-DD'),
      url = decodeURIComponent(item['rss:link']['#']),
      urlFragments = url.split('/'),
      filename = urlFragments[urlFragments.length - 1],
      filepath = normalize(path.join(folder, date + '-' + filename + '.html.md')),
      ingress = item['rss:ingress']['#'],
      author = item['rss:author']['#'],
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

  console.log(filepath);
  fs.writeFileSync(filepath, content);
};