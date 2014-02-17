var fs = require('fs'),
    path = require('path'),
    moment = require('moment'),
    normalize = require('../normalize'),
    toMarkdown = require('../toMarkdown').toMarkdown,
    downloader = require('../downloader');

function getMainImage(url, imageTitle){
    var content = '',
        img;

    if (url) {
        content += toMarkdown('<img src="' + url + '" title="' + imageTitle + '" alt="' + imageTitle + '"/>');
    }
    return content;
}

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
      ingress = normalize.text(item.safeGet('ingress')),
      text = normalize.text(item.safeGet('text')),
      imageUrl = item.safeGet('image').replace('http://www.miles.no/eksport/smiles/_image/', 'image://'),
      image = getMainImage(imageUrl, normalize.text(item.safeGet('imagetitle')));

  content = '---\n';
  content += 'title: "' + title + '"\n';
  content += 'urls:\n';
  content += '  - '+ url.replace('http://www.miles.no', '') + '\n';
  content += 'published: true\n';
  content += 'author: "' + author + '"\n';
  content += '---\n\n';
  content += toMarkdown(ingress) + '\n\n';
  if (image) {
    content += image + '\n';
  }
  content += toMarkdown(text);

  console.log(filename);
  if(!fs.existsSync(filepath)) fs.mkdirSync(filepath);
  fs.writeFileSync(filename, content);
  downloader(text);
  downloader(imageUrl);
};