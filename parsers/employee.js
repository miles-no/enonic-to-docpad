var fs = require('fs'),
    path = require('path'),
    moment = require('moment'),
    normalize = require('../normalize'),
    existingNames = {};

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

function getUniqueName(city, firstname, lastname){
  existingNames[city] = existingNames[city] || [];
  firstname = firstname.toLowerCase().replace(' ', '-');

  if(existingNames[city].indexOf(firstname) < 0){
    existingNames[city].push(firstname);
    return firstname;
  } else {
    if(firstname.indexOf('-') < 0){
      firstname += '-';
    }
    firstname += lastname.substr(0, 1);
    lastname = lastname.substr(1);
    return getUniqueName(city, firstname, lastname);
  }
}

function getSocialMeta(item){
  var content = '';
  ['twitter', 'linkedin', 'blog', 'github'].forEach(function(service){
    var link = item.safeGet(service);
    if(link) content += '  ' + service + ': ' + link + '\n';
  });

  return content !== '' ? 'social:\n' + content : '';
}

module.exports = function(folder, item){
  if(item.safeGet('quit') === 'true')
    return;

  var content,
      firstname = item.safeGet('firstname'),
      lastname = item.safeGet('lastname'),
      role = fixRoles(item.safeGet('role')),
      text = normalize.text(item.safeGet('text')),
      socialtext = normalize.text(item.safeGet('socialtext')),
      city = item.safeGet('location').replace('Menneskene ', ''),
      filepath = path.join(folder, city.toLowerCase()),
      filename = normalize.url(path.join(filepath, getUniqueName(city, firstname, lastname))) + '.html.md';

  content = '---\n';
  content += 'firstname: "' + firstname + '"\n';
  content += 'lastname: "' + lastname + '"\n';
  content += 'role: "' + role + '"\n';
  content += 'published: true\n';
  content += getSocialMeta(item);
  content += '---\n\n';
  content += text + '\n\n';
  content += socialtext;

  console.log(filename);
  if(!fs.existsSync(filepath)) fs.mkdirSync(filepath);

  fs.writeFileSync(filename, content);
};