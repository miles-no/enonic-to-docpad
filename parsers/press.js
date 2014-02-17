var fs = require('fs'),
    path = require('path'),
    moment = require('moment'),
    normalize = require('../normalize'),
    toMarkdown = require('../toMarkdown').toMarkdown,
    downloader = require('../downloader');

module.exports = function(folder, item){
  var content,
      title = normalize.frontmatter(item.title),
      date = moment(item.pubdate).format('YYYY-MM-DD'),
      url = decodeURIComponent(item.safeGet('link')),
      urlFragments = url.split('/'),
      filename = urlFragments[urlFragments.length - 1],
      filepath = normalize.url(path.join(folder, date + '-' + filename)) + '.html.md',
      ingress = normalize.text(item.safeGet('ingress')),
      file = item.safeGet('file'),
      source = item.safeGet('source'),
      text = '<a href="' + file + '">Les artikkelen i ' + source + '</a>';

  content = '---\n';
  content += 'title: "' + title + '"\n';
  content += 'urls:\n';
  content += '  - '+ url.replace('http://www.miles.no', '') + '\n';
  content += 'published: true\n';
  content += 'category: \"press\"\n';
  content += '---\n\n';
  content += toMarkdown(ingress) + '\n\n';
  content += toMarkdown(text);

  console.log(filepath);
  fs.writeFileSync(filepath, content);
  downloader(text);
};