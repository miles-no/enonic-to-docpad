var fs = require('fs'),
    path = require('path'),
    moment = require('moment'),
    normalize = require('../normalize');

function fixRoles(roles) {
  if(!roles || roles.indexOf(' ') < 0) return roles;
  return roles.split(' ').reduce(function(result, role, index, arr){
    if(index === 0){
      return role;
    } else if(index === arr.length -1){
      return result + ' og ' + role.toLowerCase();
    } else {
      return result + ', ' + role.toLowerCase();
    }
  }, '');
}

function getRssItem(item, name){
  var rss = item['rss:' + name];
  if(rss) {
    return rss['#'];
  } else {
    return '';
  }
}

function getSocialMeta(item){
  var content = '';
  ['twitter', 'linkedin', 'blog', 'github'].forEach(function(service){
    var link = getRssItem(item, service);
    if(link) content += '  ' + service + ': ' + link + '\n';
  });

  return content !== '' ? 'social:\n' + content : '';
}

module.exports = function(folder, item){
  if(item['rss:quit']['#'] === 'true')
    return;

  var content,
      firstname = item['rss:firstname']['#'],
      lastname = item['rss:lastname']['#'],
      role = fixRoles(item['rss:role']['#']),
      text = item['rss:text']['#'],
      socialtext = item['rss:socialtext']['#'],
      city = item['rss:location']['#'].replace('Menneskene ', ''),
      filepath = path.join(folder, city.toLowerCase()),
      filename = normalize(path.join(filepath, firstname.toLowerCase().replace(' ', '-') + '.html.md'));

  // normalize a bit
  text = text.replace(/(\n\s*)+/gm, '\n\n');
  socialtext = socialtext.replace(/(\n\s*)+/gm, '\n\n');

  content = '---\n';
  content += 'firstname: "' + firstname + '"\n';
  content += 'lastname: "' + lastname + '"\n';
  content += 'role: "' + role + '"\n';
  // content += 'urls:\n';
  // content += '  - '+ url.replace('http://www.miles.no', '') + '\n';
  content += 'published: true\n';
  content += getSocialMeta(item);
  content += '---\n\n';
  content += text + '\n\n';
  content += socialtext;

  console.log(filename);
  if(!fs.existsSync(filepath)) fs.mkdirSync(filepath);

  fs.writeFileSync(filename, content);
};