module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Tag",
    {
      title: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
      tableName: "tag",
    }
  );
};
