module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Event",
    {
      title: {
        type: DataTypes.STRING
      },
      event_date: {
        type: DataTypes.DATE
      },
      edition: {
        type: DataTypes.INTEGER
      },
      run_id: {
        type: DataTypes.INTEGER
      },
    },
    {
      timestamps: false,
      tableName: 'event'
    }
  );
};
