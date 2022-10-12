const {Router} = require("express")
const {getUsers} = require("../controllers/usuarios")
const router = Router()

//vamos a definir las rutas del localhost http://localhost:4005/api/v1/usuarios

router.get("/", getUsers)

module.exports = router