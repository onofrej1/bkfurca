module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "UserRole",
    {},
    {
      timestamps: false,
      tableName: "user_role",
    }
  );
};
