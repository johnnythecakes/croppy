Router.route('/', {
  name: 'home',
  subscriptions: function() {
    Meteor.subscribe('uploads');
  }
});

Router.route('/dashboard', {
  name: 'dashboard'
});

Router.plugin('ensureSignedIn', {
  only: ['dashboard']
});
