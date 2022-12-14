const express = require('express')
const messagesRouter = require('./routes/messages')
const usuariosRouter = require('./routes/usuarios')
const hillclimbRouter = require('./routes/hillclimb')
const cors = require("cors")

class Server{
    constructor() {
        this.app = express()
        this .paths = {
            messages: "/api/v1/messages",
            usuarios: "/api/v1/usuarios",
            hillclimb: "/api/v1/hillclimb"
        }
        this.middlewares()
       this.routes()
       
    }

    routes() {
       // this.app.get('/', (req, res) => {
           // res.send('Hello World')
   // }) //End Point
   this.app.use(this.paths.messages, messagesRouter)
   this.app.use(this.paths.usuarios, usuariosRouter)
   this.app.use(this.paths.hillclimb, hillclimbRouter)
}

middlewares(){
    this.app.use(cors()) //Permite solicitudes de origen cruzado
    this.app.use(express.json()) //Habilita la lectura de contenido en formato json
}

listen() {
    this.app.listen(process.env.PORT,() => {
        //console.log("Backend en ejecucion en el puerto", process.env.PORT)

        console.log(process.env.PORT);

    }) 
}
}

module.exports = Server