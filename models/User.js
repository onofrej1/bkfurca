module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
      tableName: 'user'
    }
  );
};
