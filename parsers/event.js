var fs = require('fs'),
    path = require('path'),
    moment = require('moment'),
    normalize = require('../normalize');

module.exports = function(folder, item){
  var content,
      title = normalize.frontmatter(item.title),
      city = item.safeGet('location'),
      date = moment(item.pubdate).format('YYYY-MM-DD'),
      url = decodeURIComponent(item.safeGet('link')),
      urlFragments = url.split('/'),
      filenamepart = urlFragments[urlFragments.length - 1],
      filepath = path.join(folder, city.toLowerCase()),
      filename = normalize.url(path.join(filepath, date + '-' + filenamepart)) + '.html.md',
      author = item.safeGet('author'),
      ingress = normalize.frontmatter(item.safeGet('ingress')),
      text = normalize.text(item.safeGet('text'));

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