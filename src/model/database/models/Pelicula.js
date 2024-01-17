
let Pelicula = (sequelize, DataTypes) =>{
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


    return sequelize.define(alias, columns, config);
}

module.exports = Pelicula;