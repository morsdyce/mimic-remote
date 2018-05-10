const _ = require('lodash');
const fs = require('fs');
const path = require('path');

function getPath(type, data) {
  const item = _.get(data, [`${type}s`, '0']);
  const itemName = item.id;
  const fileName = _.toLower(`${type}-${itemName}.json`);
  return path.join(__dirname, 'mocks', fileName);
}

function writeFile(type, data) {
  fs.writeFile(getPath(type, data), JSON.stringify(data, null, 2), function(err) {
    if (err) {
      console.log(`failed to write ${type}`, err);
    }
  });
}

function readFiles(dirname, onFinish) {
  const files = [];
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename, index) {
      fs.readFile(path.join(dirname, filename), 'utf-8', function(err, content) {
        if (err) {
          onFinish(err, files);
          return;
        }
        files.push({ filename, content });

        const filesDone = index >= filenames.length - 1;

        if (filesDone) {
          onFinish(null, files);
        }
      });
    });
  });
}

module.exports = {
  getPath,
  writeFile,
  readFiles
};