const generoService = require("../model/generoService");

const genresController = {
    list: async function(req, res) {
        try {
            let generos =  generoService.getAll();
            res.header('Acces-contro')
            res.json(generos);
        } catch (error) {            
            console.log(error.message);
            res.set('Content-Type', 'text/plain')
            res.send(`Error inesperado ${e.message}`).status(500);
        }
    }
}

module.exports = genresController;