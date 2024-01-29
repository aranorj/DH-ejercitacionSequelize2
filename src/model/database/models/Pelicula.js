
module.exports = (sequelize, DataTypes) =>{
    let alias = 'Peliculas';
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull:false
        },
        rating: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        awards: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        release_date:{
            type: DataTypes.DATE
        },
        length: DataTypes.INTEGER
    }
    let config = {
        tableName: 'movies',
        timestamps: false
    }


   let Pelicula = sequelize.define(alias, columns, config);

    Pelicula.associate = (models) => {
        Pelicula.hasMany(models.Actores, {
            as: "actoresFans",
            foreignKey: 'favorite_movie_id'
        }),

        Pelicula.belongsToMany(models.Actores, {
            as: 'actores',
            through: models.Peliculas_Actores,
            foreignKey: 'movie_id',
            otherKey: 'actor_id'
        }), 

        Pelicula.hasMany(models.Peliculas_Actores, {
            as: 'peliculaActores',
            foreignKey:'movie_id'
        })
        ,
        Pelicula.belongsTo(models.Generos, {
            as: 'genres',
            foreignKey: 'genre_id'
        })
    } 

   return Pelicula; 

}