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
            return await db.Peliculas.findByPk(id);
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