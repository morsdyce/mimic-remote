const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const fsUtils = require('./fsUtils');

class FileSync {

  static addGroup(payload){
    fsUtils.writeFile('group', payload);
  }

  static updateGroup(group){
    const filePath = fsUtils.getPath('group', group);

    if (fs.existsSync(filePath)) {
      fsUtils.writeFile('group', group);
    }
  }

  static removeGroup({ groupId }) {
    const filePath = fsUtils.getPath('group', { groups: [ {id: groupId } ] });

    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log('failed to delete group', groupId)
        }
      });
    }
  }

  static addMock(mock){
    fsUtils.writeFile('mock', mock)
  }

  static updateMock(mock){
    const filePath = fsUtils.getPath('mock', mock);

    if (fs.existsSync(filePath)) {
      fsUtils.writeFile('mock', mock);
    }
  }

  static removeMock({ mockId }){
    const filePath = fsUtils.getPath('mock', { mocks: [{ id: mockId }] });

    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log('failed to delete mock', mockId);
        }
      });
    }
  }

  static import(){

  }

  static loadDataFromFileSystem() {
    return new Promise((resolve, reject) => {
      const data = {
        groups: [],
        mocks: []
      };

      fsUtils.readFiles(path.join(__dirname, 'mocks'), function(err, files) {
        if (err) {
          reject(err);
        }

        files.forEach(({ filename, content }) => {
          const type = _.startsWith(filename, 'group') ? 'groups': 'mocks';

          data[type].push(content);
        });

        resolve(data);
      });
    });
  }
}

module.exports = FileSync;