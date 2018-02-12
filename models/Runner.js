module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "runner",
    {
      first_name: {
        type: DataTypes.STRING
      },
      last_name: {
        type: DataTypes.STRING
      },
      born: {
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false,
      tableName: 'runner'
    }
  );
};
