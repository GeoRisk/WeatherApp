module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define("Favorites", {
    // The email cannot be null, and must be a proper email before creation
    city: {
      type: DataTypes.STRING,
      // allowNull: false,
      // unique: true
    }
  });

  

//Associate the favorites with the user and create foreign key.
Favorites.associate = function(models) {
  Favorites.belongsTo(models.User, {
    foreignKey: {
      allowNull: false
    }
  });
};

return Favorites;

};

