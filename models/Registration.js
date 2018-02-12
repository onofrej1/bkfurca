module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Registration",
    {
      lname: {
        type: DataTypes.STRING
      },
      fname: {
        type: DataTypes.STRING
      },
      born: {
        type: DataTypes.DATE
      },
      street: {
        type: DataTypes.STRING
      },
      psc: {
        type: DataTypes.STRING
      },
      city: {
        type: DataTypes.STRING
      },
      state: {
        type: DataTypes.STRING
      },
      club: {
        type: DataTypes.STRING
      },
      category: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      approved: {
        type: DataTypes.BOOLEAN
      },
      notes: {
        type: DataTypes.TEXT
      },
      present: {
        type: DataTypes.STRING
      },
      team: {
        type: DataTypes.STRING
      },
      event: {
        type: DataTypes.STRING
      },
      paid: {
        type: DataTypes.BOOLEAN
      },
    },
    {
      //timestamps: false,
      tableName: 'registration'
    }
  );
};
