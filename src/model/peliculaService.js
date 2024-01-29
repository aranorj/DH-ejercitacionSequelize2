const db = require('./database/models')


const peliculaService = {
    getAll: async function(){
        try {            
            return await db.Peliculas.findAll()
        } catch (error) {
           console.log(error);
        }
    },
    getBy: async function(id){
        try {
            return await db.Peliculas.findByPk(id, {include: [{association: 'actores'}]});
        } catch (error) {
            throw new Error("Error al recuperar la pelicula por ID")
        }
    },
    updateBy: async function(id, body){
        try {
            return await db.Peliculas.update(
                new Pelicula(body) ,{where: {id: id}}
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
            .then((resultado)=>{
               resolve(resultado)     
            })
            .catch((error)=>{
                reject(error)
            })
        })
    },
    create: async function (body) {
        try {
            const newMovie = await db.Peliculas.create({...body})
            return newMovie
        } catch (error) {
            return error
        }
    }
}


function Pelicula({title, rating, awards, release_date, length}){
    this.title = title;
    this.rating = rating;
    this.awards = awards;
    this.release_date = release_date;
    this.length = length;
}

module.exports =  peliculaService;