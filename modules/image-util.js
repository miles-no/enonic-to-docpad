exports.getImageName = function(url) {
    var match,
        ext,
        imageRegex = /image:\/\/(.*)\?.*/g,
        formatRegex = /_format=([a-zA-Z]*)/,
        extRegex = /(jpg|png|gif)/;

    if (match = imageRegex.exec(url)) {
        if (ext = formatRegex.exec(match[0])) {
            ext = ext[1];
        }
        if (!ext && !extRegex.exec(match[0])) {
            ext = 'jpg';
        }
        url = match[1] + (ext ? '.' + ext : '');
    }
    return url;
};
