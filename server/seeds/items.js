Meteor.startup(function() {

  Factory.define('item', Items, {
    name: function() { return Fake.sentence(); },
    rating: function() { return _.random(1, 5); }
  });

  if (Items.find({}).count() === 0) {

    _(10).times(function(n) {
      Factory.create('item');
    });

  }

});

Meteor.startup(function () {
  // code to run on server at startup
  if (Meteor.users.find({}).count() === 1 ) {
    var admin = Meteor.users.findOne({});
    Roles.addUsersToRoles(admin._id, ['admin']);
  }

  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true,
    getDirectory: function(fileInfo, formData) {
      if (formData && formData.directoryName !== null) {
        return formData.directoryName;
      }
      return "";
    },
    getFileName: function(fileInfo, formData) {
      if (formData && formData.prefix !== null) {
        return formData.prefix + '_' + fileInfo.name;
      }
      return fileInfo.name;
    },
    finished: function(fileInfo, formData) {
      if (formData && formData._id !== null) {
        Items.update({_id: formData._id}, { $push: { uploads: fileInfo }});
      }
    }
  });
});
