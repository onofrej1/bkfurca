var Sequelize = require('sequelize');
var sequelize = new Sequelize('furca2', 'root', 'root', {dialect: 'mysql', logging: false});

var models = [
  'ArticleTag',
  'Article',
  'Event',
  'Result',
  'Menu',
  'MenuItem',
  'Hamburg',
  'Tag',
  'Role',
  'User',
  'Page',
  'UserRole',
  'Runner',
  //'Registration',
];
models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {
  m.MenuItem.belongsTo(m.Menu, {foreignKey: 'menu_id'});
  m.MenuItem.belongsTo(m.MenuItem, {foreignKey: 'parent_id', as: 'Parent'});
  m.MenuItem.belongsTo(m.Page, {foreignKey: 'page_id'});
  m.Result.belongsTo(m.Runner, {foreignKey: 'runner_id', as: 'Runner'});
  m.Result.belongsTo(m.Event, {foreignKey: 'event_id'});
  m.User.belongsToMany(m.Role, {as: 'roles', through: m.UserRole, foreignKey: 'user_id', otherKey: 'role_id'});
  m.Article.belongsToMany(m.Tag, {as: 'tags', through: m.ArticleTag, foreignKey: 'article_id', otherKey: 'tag_id'});
})(module.exports);

// export connection
module.exports.sequelize = sequelize;
