module.exports = {
  name: 'ui-toolbar',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ui-toolbar',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
