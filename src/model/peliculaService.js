const db = require('./database/models')


const peliculaService = {
    getAll: async function(){
        try {            
            return await db.Peliculas.findAll()
        } catch (error) {
           console.log(error);
        }
    }
}

module.exports = peliculaService;