module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Role",
    {
      title: {
        type: DataTypes.STRING
      },
    },
    {
      timestamps: false,
      tableName: 'role'
    }
  );
};
