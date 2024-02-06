const db = require('./database/models')
const {Op} = require('sequelize');


const peliculaService = {
    getAll: async function (query) {
        try {
            const { name } = query
            let condition = {}
            if (name) condition = {title: {[Op.like]: `%${name}`}};

            let response = await db.Peliculas.findAll({where: condition})
            if (response.length == 0) {
                let responseApi = await fetch(`http://www.omdbapi.com/?apikey=d4e35e92&t=${name}`)
                responseApi = await responseApi.json();
                const { Title, Released, imdbRating, imdbID, Awards, Runtime} = responseApi
                return [{
                    id: imdbID,
                    title: Title,
                    rating: imdbRating,
                    awards: Awards,
                    release_date: Released,
                    length: Runtime,
                }]
            } else {
                return response
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    getBy: async function (id) {
        return await db.Peliculas.findByPk(id, {
            include: [{
                association: 'actores'
            }]
        });

    },
    updateBy: async function (id, body) {
        try {
            return await db.Peliculas.update(
                new Pelicula(body), {
                    where: {
                        id: id
                    }
                }
            )
        } catch (error) {
            console.log(error);
            throw new Error("No se pudo modificar la peli")
        }
    },
    deleteBy: function (id) {
        return new Promise((resolve, reject) => {
            db.Peliculas.destroy({
                    where: {
                        id: id
                    }
                })
                .then((resultado) => {
                    resolve(resultado)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    add: async function (body) {
        try {
            const pelicula = new Pelicula(body);
            return await db.Peliculas.create(pelicula);
        } catch (error) {
            console.log(error);
        }
    },
    FindByName: async function(name) {
        try {
            let findMovie = await db.Peliculas.findAll({where: { title: {[Op.iLike]: `%${name}` }}})
            if (!findMovie) {
                const apiResponse = await fetch(`http://www.omdbapi.com/?apikey=d4e35e92&t=${name}`)
                return fetchApi
            }
        } catch (error) {
            
        }
    }
}


function Pelicula({
    title,
    rating,
    awards,
    release_date,
    length,
    genres
}) {
    this.title = title;
    this.rating = rating;
    this.awards = awards;
    this.release_date = release_date;
    this.length = length;
    this.genre_id = genres;
}

module.exports = peliculaService;