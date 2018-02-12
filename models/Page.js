module.exports = (sequelize, DataTypes) => {

  return sequelize.define(
    "Page",
    {
      title: DataTypes.STRING
      ,
      body: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
      tableName: 'page'
    }
  );
};
