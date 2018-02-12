module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Result",
    {
      event_id: {
        type: DataTypes.INTEGER
      },
      runner_id: {
        type: DataTypes.INTEGER
      },
      place: {
        type: DataTypes.INTEGER
      },
      finish_time: {
        type: DataTypes.TIME
      },
      category: {
        type: DataTypes.STRING
      },
      team: {
        type: DataTypes.STRING
      },
      start_number: {
        type: DataTypes.STRING
      },

    },
    {
      timestamps: false,
      tableName: "result"
    }
  );
};
