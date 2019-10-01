module.exports = {
  name: 'core-data',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/core-data',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
