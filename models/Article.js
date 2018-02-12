module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "article",
    {
      title: {
        type: DataTypes.STRING
      },
      author: {
        type: DataTypes.STRING
      },
      content: {
        type: DataTypes.TEXT
      },
      source: {
        type: DataTypes.STRING
      },
      created_at: {
        type: DataTypes.DATE
      }
    },
    {
      timestamps: false,
      tableName: "article"
    }
  );
};
