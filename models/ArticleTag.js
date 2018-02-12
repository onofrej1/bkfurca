module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "ArticleTag",
    {},
    {
      timestamps: false,
      tableName: "article_tag",
    }
  );
};
