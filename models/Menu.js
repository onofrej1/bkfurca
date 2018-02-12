module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Menu",
    {
      title: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
      tableName: 'menu'
    }
  );
};
