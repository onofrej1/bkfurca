module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Hamburg",
    {
      title: {
        type: DataTypes.STRING
      },
      event_date: {
        type: DataTypes.DATE
      },
      notes: {
        type: DataTypes.TEXT
      },
    },
    {
      timestamps: false,
      tableName: 'hamburg'
    }
  );
};
